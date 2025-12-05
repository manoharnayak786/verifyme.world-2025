import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import { randomUUID } from "crypto";
import { log } from "./index";

// Extend express session type
declare module 'express-session' {
  interface SessionData {
    userId: string;
    username: string;
    role: string;
  }
}

// Simple password hashing (in production, use bcrypt)
function hashPassword(password: string): string {
  // Using a simple hash for demo - in production use bcrypt
  return Buffer.from(password).toString('base64');
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Middleware to check if user is authenticated
function isAuthenticated(req: Request, res: Response, next: Function) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

// Middleware to check if user has specific role
function hasRole(role: string) {
  return (req: Request, res: Response, next: Function) => {
    if (req.session.role === role) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "verifyme-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

  // ============================================
  // Authentication Routes
  // ============================================

  // POST /api/auth/signup - Register new user
  app.post("/api/auth/signup", async (req: Request, res: Response) => {
    try {
      const { username, password, role } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      // Check if user exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }

      // Create user
      const hashedPassword = hashPassword(password);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
        role: role || "learner",
      });

      // Set session
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.role = user.role;

      log(`User registered: ${username} (${role || "learner"})`);

      res.status(201).json({
        id: user.id,
        username: user.username,
        role: user.role,
      });
    } catch (error: any) {
      log(`Signup error: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // POST /api/auth/login - Login user
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user || !verifyPassword(password, user.password)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Set session
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.role = user.role;

      log(`User logged in: ${username}`);

      res.json({
        id: user.id,
        username: user.username,
        role: user.role,
      });
    } catch (error: any) {
      log(`Login error: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // POST /api/auth/logout - Logout user
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    const username = req.session.username;
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      log(`User logged out: ${username}`);
      res.json({ message: "Logged out successfully" });
    });
  });

  // GET /api/auth/me - Get current user
  app.get("/api/auth/me", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        id: user.id,
        username: user.username,
        role: user.role,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // ============================================
  // Institution Routes
  // ============================================

  // GET /api/institutions - List all institutions
  app.get("/api/institutions", async (req: Request, res: Response) => {
    try {
      const institutions = await storage.getAllInstitutions();
      res.json(institutions);
    } catch (error: any) {
      log(`Error fetching institutions: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // GET /api/institutions/:id - Get institution by ID
  app.get("/api/institutions/:id", async (req: Request, res: Response) => {
    try {
      const institution = await storage.getInstitution(req.params.id);
      if (!institution) {
        return res.status(404).json({ message: "Institution not found" });
      }
      res.json(institution);
    } catch (error: any) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // POST /api/institutions - Create institution (issuer only)
  app.post("/api/institutions", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { name, slug, country, logoInitials, type } = req.body;

      if (!name || !slug || !country || !logoInitials || !type) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const institution = await storage.createInstitution({
        name,
        slug,
        country,
        logoInitials,
        type,
        createdBy: req.session.userId!,
      });

      log(`Institution created: ${name} by ${req.session.username}`);
      res.status(201).json(institution);
    } catch (error: any) {
      log(`Error creating institution: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // ============================================
  // Credential Routes
  // ============================================

  // GET /api/credentials - List credentials (with optional search)
  app.get("/api/credentials", async (req: Request, res: Response) => {
    try {
      const { search } = req.query;

      let credentials;
      if (search && typeof search === 'string') {
        credentials = await storage.searchCredentials(search);
      } else {
        credentials = await storage.getAllCredentials();
      }

      res.json(credentials);
    } catch (error: any) {
      log(`Error fetching credentials: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // GET /api/credentials/:id - Get credential by ID
  app.get("/api/credentials/:id", async (req: Request, res: Response) => {
    try {
      const credential = await storage.getCredential(req.params.id);
      if (!credential) {
        return res.status(404).json({ message: "Credential not found" });
      }

      // Get institution details
      const institution = await storage.getInstitution(credential.institutionId);

      res.json({
        ...credential,
        institution,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // POST /api/credentials - Issue new credential (authenticated users)
  app.post("/api/credentials", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { holderName, title, institutionId, issuedAt, expiresAt, country, onChain, imageUrl } = req.body;

      if (!holderName || !title || !institutionId || !country) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Check if institution exists
      const institution = await storage.getInstitution(institutionId);
      if (!institution) {
        return res.status(404).json({ message: "Institution not found" });
      }

      // Generate credential ID
      const year = new Date().getFullYear();
      const random = Math.floor(1000 + Math.random() * 9000);
      const credentialId = `VFY-${year}-${random}`;

      const credential = await storage.createCredential({
        id: credentialId,
        holderName,
        title,
        institutionId,
        issuedAt: issuedAt ? new Date(issuedAt) : new Date(),
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        status: "pending",
        country,
        onChain: onChain || false,
        imageUrl: imageUrl || null,
        issuedBy: req.session.userId!,
      });

      log(`Credential issued: ${credentialId} by ${req.session.username}`);
      res.status(201).json(credential);
    } catch (error: any) {
      log(`Error creating credential: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // PATCH /api/credentials/:id - Update credential status
  app.patch("/api/credentials/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const credential = await storage.updateCredentialStatus(req.params.id, status);
      if (!credential) {
        return res.status(404).json({ message: "Credential not found" });
      }

      log(`Credential ${req.params.id} status updated to ${status} by ${req.session.username}`);
      res.json(credential);
    } catch (error: any) {
      log(`Error updating credential: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // DELETE /api/credentials/:id - Delete credential
  app.delete("/api/credentials/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteCredential(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Credential not found" });
      }

      log(`Credential ${req.params.id} deleted by ${req.session.username}`);
      res.json({ message: "Credential deleted successfully" });
    } catch (error: any) {
      log(`Error deleting credential: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // ============================================
  // Verification Routes
  // ============================================

  // GET /api/verifications - List all verifications
  app.get("/api/verifications", async (req: Request, res: Response) => {
    try {
      const verifications = await storage.getAllVerifications();
      res.json(verifications);
    } catch (error: any) {
      log(`Error fetching verifications: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // GET /api/verifications/credential/:credentialId - Get verifications for a credential
  app.get("/api/verifications/credential/:credentialId", async (req: Request, res: Response) => {
    try {
      const verifications = await storage.getVerificationsByCredential(req.params.credentialId);
      res.json(verifications);
    } catch (error: any) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // POST /api/verifications - Create verification
  app.post("/api/verifications", async (req: Request, res: Response) => {
    try {
      const { credentialId, verifiedBy, result, location } = req.body;

      if (!credentialId || !verifiedBy || !result || !location) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Check if credential exists
      const credential = await storage.getCredential(credentialId);
      if (!credential) {
        return res.status(404).json({ message: "Credential not found" });
      }

      const verification = await storage.createVerification({
        credentialId,
        verifiedBy,
        result,
        location,
      });

      log(`Verification created for credential ${credentialId} by ${verifiedBy}`);
      res.status(201).json(verification);
    } catch (error: any) {
      log(`Error creating verification: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // ============================================
  // Analytics Routes
  // ============================================

  // GET /api/analytics - Get analytics data
  app.get("/api/analytics", async (req: Request, res: Response) => {
    try {
      const credentials = await storage.getAllCredentials();
      const verifications = await storage.getAllVerifications();
      const institutions = await storage.getAllInstitutions();

      const stats = {
        totalCredentials: credentials.length,
        validCredentials: credentials.filter(c => c.status === "valid").length,
        revokedCredentials: credentials.filter(c => c.status === "revoked").length,
        pendingCredentials: credentials.filter(c => c.status === "pending").length,
        totalVerifications: verifications.length,
        successfulVerifications: verifications.filter(v => v.result === "success").length,
        failedVerifications: verifications.filter(v => v.result === "failed").length,
        totalInstitutions: institutions.length,
        credentialsByCountry: credentials.reduce((acc: any, c) => {
          acc[c.country] = (acc[c.country] || 0) + 1;
          return acc;
        }, {}),
        credentialsByStatus: {
          valid: credentials.filter(c => c.status === "valid").length,
          revoked: credentials.filter(c => c.status === "revoked").length,
          expired: credentials.filter(c => c.status === "expired").length,
          pending: credentials.filter(c => c.status === "pending").length,
        },
        recentCredentials: credentials.slice(-10).reverse(),
        recentVerifications: verifications.slice(-10).reverse(),
      };

      res.json(stats);
    } catch (error: any) {
      log(`Error fetching analytics: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  log("API routes registered successfully");
  return httpServer;
}
