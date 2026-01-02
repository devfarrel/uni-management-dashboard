# 🎓 University Management Dashboard <br>
A full-stack University Management Dashboard built with modern web technologies.
This project demonstrates a real-world admin dashboard architecture with a clean separation between backend APIs and frontend UI, including authentication-ready patterns, data tables, forms, and reusable layouts.
---
## ✨ Features <br>
📊 Admin dashboard layout (Sidebar + Header) <br>
👤 User management (list, create, delete) <br>
⚡ Fast data fetching with React Query <br>
🧩 Reusable components & layouts <br>
🎨 Modern UI with Shadcn UI + Tailwind CSS <br>
🔒 Backend powered by Express + Prisma + PostgreSQL <br>
🧪 Seedable database for testing <br>
🧠 Type-safe frontend & backend <br>
---
## 🧱 Tech Stack <br>
Frontend <br>
*React (Vite) <br>
*TypeScript <br>
*React Router DOM <br>
*@tanstack/react-query <br>
*Shadcn UI <br>
*Tailwind CSS <br>
*React Hook Form <br>
*Zod <br>

Backend <br>
*Node.js <br>
*Express <br>
*TypeScript <br>
*Prisma ORM <br>
*PostgreSQL <br>
---
 📂 Project Structure <br>
`
project-1/ <br>
├── backend/ <br>
│   ├── prisma/ <br>
│   │   ├── schema.prisma <br>
│   │   └── seed.ts <br>
│   ├── src/ <br>
│   │   ├── app.ts <br>
│   │   ├── server.ts <br>
│   │   ├── routes/ <br>
│   │   ├── controllers/ <br>
│   │   └── prisma.ts <br>
│   └── .env <br>
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
