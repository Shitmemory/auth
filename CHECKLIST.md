



== PART 2 ==

✅ Chronological Checklist (Raw SQL + PostgreSQL + Node)
📦 Project Initialization

npm init -y

Install: pg, bcrypt, dotenv, (auth.js optional)

    (Optional) Setup: TailwindCSS, Prettier, TypeScript

🗄️ Database Setup

Create NeonDB database (or local PostgreSQL)

Write schema.sql (create users table with email UNIQUE, password, role, etc.)

Create and run migration script (reads schema.sql and runs it via pg)

    (Optional) Write and run a seed script for test data

🧠 Backend Logic

Create db.ts (PostgreSQL client with pg.Pool)

Write helper functions:

    createUser(email, password, role)

    getUserByEmail(email)

Build signup route:

    Hash password

    Insert user (raw SQL, parameterized)

    Handle duplicate_email error

    Build login route:

        Fetch by email

        Compare password

        Return token or session

🔐 Authentication

Setup auth.js or JWT manually

    Add protected route middleware

🛠️ Tools

Add .env with connection string

Use NeonDB console to view data

Log all SQL queries in dev

Sanitize inputs and use parameterized queries