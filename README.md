

# 🏥 Shastho Mart

A backend API for **Shastho Mart**, a health-focused marketplace platform, built with **Express 5**, **TypeScript**, **Prisma** and **PostgreSQL**, and deployed on **Vercel**.

> ⚠️ Items marked `TODO` are things I could not confirm from the repository. Please check them and edit.

![Project diagram](./docs/diagram.png)
<img width="7441" height="4300" alt="diagram (1)" src="https://github.com/user-attachments/assets/fc564014-1e8d-4f50-b226-fbf6de80e0a2" />

## ✨ Features

- Authentication and session management with Better Auth
- Admin account seeding script
- Product / medicine catalog and order management `TODO: confirm real features`
- Role-based access (for example admin, seller, customer) `TODO: confirm roles`
- Request validation with Zod
- Type-safe database access with Prisma and PostgreSQL
- Serverless deployment on Vercel

## 🧰 Tech Stack

| Area | Tools |
| --- | --- |
| Runtime / Framework | Node.js 20+, Express 5 |
| Language | TypeScript (ES modules) |
| Database / ORM | PostgreSQL, Prisma 7 (`@prisma/adapter-pg`) |
| Auth | Better Auth |
| Validation | Zod |
| Build / Tooling | tsup, tsx |
| Hosting | Vercel |

## 📁 Project Structure

```
Shastho_Mart/
├── api/               # Built output for Vercel
├── prisma/            # Prisma schema and migrations
├── src/
│   ├── index.ts       # App entry point
│   └── scripts/
│       └── seedAdmin.ts   # Creates the initial admin user
├── prisma.config.ts
├── tsconfig.json
├── vercel.json
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or newer
- A PostgreSQL database

### Installation

```bash
git clone https://github.com/NahiyaNasir/Shastho_Mart.git
cd Shastho_Mart
npm install
```

`npm install` also runs `prisma generate` automatically.

### Environment variables

Create a `.env` file in the project root. `TODO: confirm exact names against your code.`

```env
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/shasthomart"

# Better Auth
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:5000

# Admin seed
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_me
```

### Set up the database

```bash
npm run migrate    # run migrations (dev)
npm run seed:admin # create the initial admin account
```

### Run the app

```bash
npm run dev
```

The server runs at `http://localhost:5000`.

## 📜 Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server with `tsx watch` |
| `npm run build` | Generate Prisma client and bundle to `api/` with tsup |
| `npm run seed:admin` | Seed the admin user |
| `npm run migrate` | Run Prisma migrations in dev |
| `npm run generate` | Generate the Prisma client |
| `npm run push` | Push the Prisma schema to the database |
| `npm run pull` | Pull the schema from the database |
| `npm run studio` | Open Prisma Studio |

## 🔌 API Endpoints

`TODO: add your routes, for example:`

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/...` | Authentication |
| GET | `/api/products` | List products |
| POST | `/api/orders` | Create an order |

## ☁️ Deployment

The project is configured for Vercel through `vercel.json`. Add all environment variables in your Vercel project settings, then deploy. The build script bundles the app into `api/`.

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes and open a pull request

## 📄 License

ISC

## 👤 Author

**Nahiya Nasir** - [@NahiyaNasir](https://github.com/NahiyaNasir)
