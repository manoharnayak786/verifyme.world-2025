# VerifyMe.world - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All authentication endpoints use session-based authentication with cookies.

### POST /api/auth/signup
Register a new user account.

**Request Body:**
```json
{
  "username": "string (required)",
  "password": "string (required)",
  "role": "learner | issuer | verifier (optional, default: learner)"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "username": "string",
  "role": "string"
}
```

**Error Responses:**
- `400 Bad Request` - Missing username or password
- `409 Conflict` - Username already exists

---

### POST /api/auth/login
Login to an existing account.

**Request Body:**
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "username": "string",
  "role": "string"
}
```

**Error Responses:**
- `400 Bad Request` - Missing username or password
- `401 Unauthorized` - Invalid credentials

---

### POST /api/auth/logout
Logout from current session.

**Response:** `200 OK`
```json
{
  "message": "Logged out successfully"
}
```

---

### GET /api/auth/me
Get current authenticated user information.

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "username": "string",
  "role": "string"
}
```

**Error Responses:**
- `401 Unauthorized` - Not authenticated

---

## Institutions

### GET /api/institutions
List all institutions.

**Response:** `200 OK`
```json
[
  {
    "id": "string",
    "name": "string",
    "slug": "string",
    "country": "string",
    "logoInitials": "string",
    "type": "university | bootcamp | mooc | certification-body",
    "createdBy": "uuid | null",
    "createdAt": "ISO 8601 date"
  }
]
```

---

### GET /api/institutions/:id
Get a specific institution by ID.

**Response:** `200 OK`
```json
{
  "id": "string",
  "name": "string",
  "slug": "string",
  "country": "string",
  "logoInitials": "string",
  "type": "university | bootcamp | mooc | certification-body",
  "createdBy": "uuid | null",
  "createdAt": "ISO 8601 date"
}
```

**Error Responses:**
- `404 Not Found` - Institution not found

---

### POST /api/institutions
Create a new institution.

**Authentication:** Required

**Request Body:**
```json
{
  "name": "string (required)",
  "slug": "string (required)",
  "country": "string (required)",
  "logoInitials": "string (required)",
  "type": "university | bootcamp | mooc | certification-body (required)"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "name": "string",
  "slug": "string",
  "country": "string",
  "logoInitials": "string",
  "type": "string",
  "createdBy": "uuid",
  "createdAt": "ISO 8601 date"
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields
- `401 Unauthorized` - Not authenticated

---

## Credentials

### GET /api/credentials
List all credentials or search for credentials.

**Query Parameters:**
- `search` (optional) - Search query to filter credentials by ID, holder name, or title

**Response:** `200 OK`
```json
[
  {
    "id": "string",
    "holderName": "string",
    "title": "string",
    "institutionId": "string",
    "issuedAt": "ISO 8601 date",
    "expiresAt": "ISO 8601 date | null",
    "status": "valid | revoked | expired | pending",
    "country": "string",
    "onChain": "boolean",
    "imageUrl": "string | null",
    "issuedBy": "uuid | null",
    "createdAt": "ISO 8601 date"
  }
]
```

**Example:**
```
GET /api/credentials?search=john
```

---

### GET /api/credentials/:id
Get a specific credential by ID with institution details.

**Response:** `200 OK`
```json
{
  "id": "string",
  "holderName": "string",
  "title": "string",
  "institutionId": "string",
  "issuedAt": "ISO 8601 date",
  "expiresAt": "ISO 8601 date | null",
  "status": "valid | revoked | expired | pending",
  "country": "string",
  "onChain": "boolean",
  "imageUrl": "string | null",
  "issuedBy": "uuid | null",
  "createdAt": "ISO 8601 date",
  "institution": {
    "id": "string",
    "name": "string",
    "slug": "string",
    "country": "string",
    "logoInitials": "string",
    "type": "string",
    "createdBy": "uuid | null",
    "createdAt": "ISO 8601 date"
  }
}
```

**Error Responses:**
- `404 Not Found` - Credential not found

---

### POST /api/credentials
Issue a new credential.

**Authentication:** Required

**Request Body:**
```json
{
  "holderName": "string (required)",
  "title": "string (required)",
  "institutionId": "string (required)",
  "country": "string (required)",
  "issuedAt": "ISO 8601 date (optional, default: now)",
  "expiresAt": "ISO 8601 date (optional)",
  "onChain": "boolean (optional, default: false)",
  "imageUrl": "string (optional)"
}
```

**Response:** `201 Created`
```json
{
  "id": "VFY-YYYY-XXXX",
  "holderName": "string",
  "title": "string",
  "institutionId": "string",
  "issuedAt": "ISO 8601 date",
  "expiresAt": "ISO 8601 date | null",
  "status": "pending",
  "country": "string",
  "onChain": "boolean",
  "imageUrl": "string | null",
  "issuedBy": "uuid",
  "createdAt": "ISO 8601 date"
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Institution not found

---

### PATCH /api/credentials/:id
Update credential status.

**Authentication:** Required

**Request Body:**
```json
{
  "status": "valid | revoked | expired | pending (required)"
}
```

**Response:** `200 OK`
```json
{
  "id": "string",
  "holderName": "string",
  "title": "string",
  "institutionId": "string",
  "issuedAt": "ISO 8601 date",
  "expiresAt": "ISO 8601 date | null",
  "status": "string",
  "country": "string",
  "onChain": "boolean",
  "imageUrl": "string | null",
  "issuedBy": "uuid | null",
  "createdAt": "ISO 8601 date"
}
```

**Error Responses:**
- `400 Bad Request` - Missing status
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Credential not found

---

### DELETE /api/credentials/:id
Delete a credential.

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "message": "Credential deleted successfully"
}
```

**Error Responses:**
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Credential not found

---

## Verifications

### GET /api/verifications
List all verifications.

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "credentialId": "string",
    "verifiedBy": "string",
    "verifiedAt": "ISO 8601 date",
    "result": "success | failed",
    "location": "string",
    "createdAt": "ISO 8601 date"
  }
]
```

---

### GET /api/verifications/credential/:credentialId
Get all verifications for a specific credential.

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "credentialId": "string",
    "verifiedBy": "string",
    "verifiedAt": "ISO 8601 date",
    "result": "success | failed",
    "location": "string",
    "createdAt": "ISO 8601 date"
  }
]
```

---

### POST /api/verifications
Create a new verification record.

**Request Body:**
```json
{
  "credentialId": "string (required)",
  "verifiedBy": "string (required)",
  "result": "success | failed (required)",
  "location": "string (required)"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "credentialId": "string",
  "verifiedBy": "string",
  "verifiedAt": "ISO 8601 date",
  "result": "success | failed",
  "location": "string",
  "createdAt": "ISO 8601 date"
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields
- `404 Not Found` - Credential not found

---

## Analytics

### GET /api/analytics
Get comprehensive analytics about the platform.

**Response:** `200 OK`
```json
{
  "totalCredentials": "number",
  "validCredentials": "number",
  "revokedCredentials": "number",
  "pendingCredentials": "number",
  "totalVerifications": "number",
  "successfulVerifications": "number",
  "failedVerifications": "number",
  "totalInstitutions": "number",
  "credentialsByCountry": {
    "countryName": "number"
  },
  "credentialsByStatus": {
    "valid": "number",
    "revoked": "number",
    "expired": "number",
    "pending": "number"
  },
  "recentCredentials": [
    {
      "id": "string",
      "holderName": "string",
      "title": "string",
      "institutionId": "string",
      "issuedAt": "ISO 8601 date",
      "expiresAt": "ISO 8601 date | null",
      "status": "string",
      "country": "string",
      "onChain": "boolean",
      "imageUrl": "string | null",
      "issuedBy": "uuid | null",
      "createdAt": "ISO 8601 date"
    }
  ],
  "recentVerifications": [
    {
      "id": "uuid",
      "credentialId": "string",
      "verifiedBy": "string",
      "verifiedAt": "ISO 8601 date",
      "result": "success | failed",
      "location": "string",
      "createdAt": "ISO 8601 date"
    }
  ]
}
```

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "message": "Error description"
}
```

### Common HTTP Status Codes
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `500 Internal Server Error` - Server error

---

## Testing Examples

### Using cURL

**Sign up a new user:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass","role":"issuer"}' \
  -c cookies.txt
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}' \
  -c cookies.txt
```

**Create a credential (authenticated):**
```bash
curl -X POST http://localhost:5000/api/credentials \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "holderName":"John Doe",
    "title":"Test Certificate",
    "institutionId":"inst-001",
    "country":"USA",
    "onChain":true
  }'
```

**Search credentials:**
```bash
curl "http://localhost:5000/api/credentials?search=john"
```

**Get analytics:**
```bash
curl http://localhost:5000/api/analytics
```

**Create a verification:**
```bash
curl -X POST http://localhost:5000/api/verifications \
  -H "Content-Type: application/json" \
  -d '{
    "credentialId":"VFY-2024-8842",
    "verifiedBy":"Test Company",
    "result":"success",
    "location":"New York, USA"
  }'
```

---

## Data Models

### User Roles
- `learner` - Can view credentials
- `issuer` - Can issue and manage credentials
- `verifier` - Can verify credentials

### Credential Status
- `valid` - Credential is valid and active
- `revoked` - Credential has been revoked
- `expired` - Credential has expired
- `pending` - Credential is pending approval

### Verification Result
- `success` - Verification was successful
- `failed` - Verification failed

### Institution Types
- `university` - University or college
- `bootcamp` - Coding bootcamp or training program
- `mooc` - Massive Open Online Course provider
- `certification-body` - Professional certification body
