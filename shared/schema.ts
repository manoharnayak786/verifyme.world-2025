import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("learner"), // learner, issuer, verifier
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const institutions = pgTable("institutions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  country: text("country").notNull(),
  logoInitials: text("logo_initials").notNull(),
  type: text("type").notNull(), // university, bootcamp, mooc, certification-body
  createdBy: varchar("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const credentials = pgTable("credentials", {
  id: varchar("id").primaryKey(),
  holderName: text("holder_name").notNull(),
  title: text("title").notNull(),
  institutionId: varchar("institution_id").references(() => institutions.id).notNull(),
  issuedAt: timestamp("issued_at").notNull(),
  expiresAt: timestamp("expires_at"),
  status: text("status").notNull().default("valid"), // valid, revoked, expired, pending
  country: text("country").notNull(),
  onChain: boolean("on_chain").notNull().default(false),
  imageUrl: text("image_url"),
  issuedBy: varchar("issued_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const verifications = pgTable("verifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  credentialId: varchar("credential_id").references(() => credentials.id).notNull(),
  verifiedBy: text("verified_by").notNull(),
  verifiedAt: timestamp("verified_at").defaultNow().notNull(),
  result: text("result").notNull(), // success, failed
  location: text("location").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export const insertInstitutionSchema = createInsertSchema(institutions).omit({
  id: true,
  createdBy: true,
  createdAt: true,
});

export const insertCredentialSchema = createInsertSchema(credentials).omit({
  issuedBy: true,
  createdAt: true,
});

export const insertVerificationSchema = createInsertSchema(verifications).omit({
  id: true,
  verifiedAt: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Institution = typeof institutions.$inferSelect;
export type Credential = typeof credentials.$inferSelect;
export type Verification = typeof verifications.$inferSelect;
