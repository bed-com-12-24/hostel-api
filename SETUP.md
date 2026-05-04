# Hostel API Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- MySQL database (local or remote)
- PowerShell execution policy enabled (for Windows)

## Installation Steps

### 1. Enable PowerShell Execution Policy (Windows)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Install Dependencies
```bash
# Using npm
npm install @nestjs/typeorm typeorm mysql2 @nestjs/config @nestjs/jwt passport-jwt @nestjs/passport passport bcrypt

# Or if you prefer pnpm (after installing it)
pnpm add @nestjs/typeorm typeorm mysql2 @nestjs/config @nestjs/jwt passport-jwt @nestjs/passport passport bcrypt
```

### 3. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```

Update the `.env` file with your database credentials:

#### For Local Database:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_local_password
DB_DATABASE=hostel_db
```

#### For Remote Database:
```env
DB_HOST=your_remote_database_ip_or_domain
DB_PORT=3306
DB_USERNAME=your_remote_username
DB_PASSWORD=your_remote_password
DB_DATABASE=your_remote_database_name
```

### 4. Database Setup
Create the database in MySQL:
```sql
CREATE DATABASE hostel_db;
```

### 5. Run the Application
```bash
# Development mode
npm run start:dev

# Debug mode
npm run start:debug

# Production mode
npm run build
npm run start:prod
```

## Debugging and Connection Issues

### Common Issues:
1. **PowerShell Execution Policy**: Enable script execution as shown in step 1
2. **Database Connection**: Ensure MySQL is running and credentials are correct
3. **Port Conflicts**: Default port is 3000, change in `.env` if needed
4. **Remote Database Firewall**: Ensure remote database allows connections from your IP

### Testing Database Connection:
```bash
# Test MySQL connection
mysql -h localhost -u root -p
# Or for remote:
mysql -h your_remote_host -u username -p
```

## API Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile (requires auth)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID

## Security Notes
- Change JWT_SECRET in production
- Disable synchronize in production (set to false)
- Use environment variables for all sensitive data
