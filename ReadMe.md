# 📝 Survey App

A full-stack survey application built with:

- **Frontend:** React (Vite) + TypeScript + TailwindCSS
- **Backend:** Node.js + Express + Prisma + SQLite

---

## ⚙️ Prerequisites

- Node.js v18 or newer
- npm (or yarn)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/survey-app.git
cd survey-app
```

### 2. Install Dependencies
#### Backend Setup
```bash
cd server
npm install
npx prisma migrate dev --name init      # Create DB & apply schema
npm run seed                            # Seed initial survey questions
npm run dev                             # Start backend at http://localhost:4000
```

#### Frontend Setup
```bash
cd client
npm install
npm run dev                             # Start frontend at http://localhost:5173
```

## Project URLs

```bash
Service	URL
Frontend (Vite)	http://localhost:5173
Backend (API)	http://localhost:4000
Prisma Studio	http://localhost:5555
```

## To view database records with Prisma Studio:
```bash
cd server
npx prisma studio                             # Start frontend at http://localhost:5173
```

### If we want to reset the database and reseed it:
```bash
cd server
npx prisma migrate reset
npm run seed
```

# Future Improvements
1. Add user authentication (JWT + login/signup)
2. Admin ability to add/edit questions
3. Form session tracking with UUID
4. CSV export of responses