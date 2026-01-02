# 🎓 University Management Dashboard
A full-stack University Management Dashboard built with modern web technologies.
This project demonstrates a real-world admin dashboard architecture with a clean separation between backend APIs and frontend UI, including authentication-ready patterns, data tables, forms, and reusable layouts.
---
## ✨ Features
📊 Admin dashboard layout (Sidebar + Header)
👤 User management (list, create, delete)
⚡ Fast data fetching with React Query
🧩 Reusable components & layouts
🎨 Modern UI with Shadcn UI + Tailwind CSS
🔒 Backend powered by Express + Prisma + PostgreSQL
🧪 Seedable database for testing
🧠 Type-safe frontend & backend
---
## 🧱 Tech Stack
Frontend
*React (Vite)
*TypeScript
*React Router DOM
*@tanstack/react-query
*Shadcn UI
*Tailwind CSS
*React Hook Form
*Zod

Backend
*Node.js
*Express
*TypeScript
*Prisma ORM
*PostgreSQL
---
## 📂 Project Structure
`
project-1/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── prisma.ts
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── lib/
│   └── main.tsx
`
---
## 🚀 Getting Started
Clone the repository
`
git clone https://github.com/your-username/uni-management-dashboard.git
cd uni-management-dashboard
`
### Backend Setup
`
cd backend
npm install
`
Create .env:
`
DATABASE_URL="postgresql://user:password@localhost:5432/your_db"
PORT=4000
`
Generate Prisma client:
`
npx prisma generate
`
Run migrations:
`
Run migrations:
`
Start backend:
`
npm run dev
`
---
### Frontend Setup
`
cd frontend
npm install
npm run dev
`
Frontend will run on:
`
http://localhost:5173
`
---
## 🧠 Architecture Notes

### Backend routes ≠ frontend routes
*Backend routes handle data
*Frontend routes handle UI & navigation
### React Query handles:
*Data fetching
*Caching
*Loading & error states
*Cache invalidation after mutations
### Zod + React Hook Form
*Schema-based validation
*Strong type inference
*Reusable form logic
### Shadcn UI
*Headless components
*Full styling control with Tailwind
*Production-ready patterns
---
## 🧪 Useful Commands
Open Prisma Studio:
`
npx prisma studio --url="postgresql://user:password@localhost:5432/your_db"
`
---
## 📌 Future Improvements
*Authentication & role-based access
*Pagination & search
*Edit user flow
*Audit logs
*Course & enrollment management
*Dark mode support
---
## 📄 License
MIT License
