# Sparkle E-Commerce Backend

A production-grade, dual-database (SQL Server / PostgreSQL) Express & TypeScript backend API with Google Gemini AI bot integration.

---

## 📁 Directory Architecture

```
backend/
├── prisma/
│   ├── schema.prisma      # Dual-DB Relational Schema (Postgres & SQL Server compatible)
│   └── seed.ts           # Auto-seeds default Admin, Demo Users, Coupons, & Products
├── src/
│   ├── config/           # Database, Env validation (Zod), and Gemini AI config
│   ├── controllers/      # Express controllers (Auth, Products, Orders, Admin, AI)
│   ├── middleware/       # JWT Auth, Role Guard, Zod validation, Error handling
│   ├── routes/           # REST Router endpoints under /api/v1
│   ├── services/         # Business logic & AI Tool execution engine
│   ├── utils/            # Winston logger, Async Handler, ApiError class
│   ├── app.ts            # Express app configuration & CORS setup
│   └── server.ts         # Server entry point
├── .env                  # Active Environment variables
├── package.json
└── tsconfig.json
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Database Connection

#### **Option A: PostgreSQL (Production / Current Setting)**
Edit `.env`:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/sparkle_db"
```
In `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### **Option B: SQL Server (Development)**
Edit `.env`:
```env
DATABASE_URL="mssql://sa:YourPassword123@localhost:1433/SparkleDB?encrypt=true"
```
In `prisma/schema.prisma`, update the provider:
```prisma
datasource db {
  provider = "sqlserver"
  url      = env("DATABASE_URL")
}
```

---

### 3. Run Database Migrations & Seed Data

Once PostgreSQL or SQL Server is running locally:

```bash
# Generate Prisma Client types
npm run prisma:generate

# Run DB Migration
npm run prisma:migrate:dev --name init

# Seed Database with default Admin & Products
npm run prisma:seed
```

---

### 4. Start Development Server

```bash
npm run dev
```
The server will start at: **`http://localhost:5000/api/v1`**

- **Health Check**: `GET http://localhost:5000/health`
- **Auth Routes**: `/api/v1/auth/register`, `/api/v1/auth/login`, `/api/v1/auth/me`
- **Product Catalog**: `/api/v1/products`
- **Orders**: `/api/v1/orders`
- **Admin Dashboard**: `/api/v1/admin/dashboard`
- **AI Bot Assistant**: `/api/v1/ai/chat`

---

## 🔑 Default Credentials Seeded

- **Admin Account**: `admin@sparkle.com` / `Admin@123`
- **Demo User Account**: `john@example.com` / `password123`
- **Default Coupon**: `SAVE10` (10% off)
