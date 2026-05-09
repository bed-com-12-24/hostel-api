# 1. Register an admin
POST http://localhost:3000/api/auth/register
Body (JSON):
{
  "name": "Admin User",
  "email": "admin@hostel.com",
  "password": "secret123",
  "role": "admin"
}
→ Returns: { user: {...}, token: "eyJ..." }

# 2. Register a student
POST http://localhost:3000/api/auth/register
Body:
{
  "name": "John Banda",
  "email": "john@uni.mw",
  "password": "pass123",
  "role": "student",
  "studentId": "BSC-COM-06-24"
}

# 3. Login
POST http://localhost:3000/api/auth/login
Body: { "email": "admin@hostel.com", "password": "secret123" }
→ Copy the token from the response

# 4. Get your profile (needs token)
GET http://localhost:3000/api/auth/me
Header: Authorization: Bearer <paste_token_here>

# 5. List all users — ADMIN ONLY
GET http://localhost:3000/api/users
Header: Authorization: Bearer <admin_token>
→ Works ✓

# Try same with student token → 401 Access denied