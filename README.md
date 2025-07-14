
## 🌟 Support the Project

Please Don't forget to support me with a ⭐ STAR — it really helps and motivates me to keep improving the system!

---
<div align="center">
<table align="center">
  <tr>
    <td><img src="/screenshots/banner.png" alt="Banner" width="100%" /></td>
</tr>
</table>
</div>

# 🚀 SaaS AI Website Builder

A powerful AI-powered SaaS platform that allows users to build websites simply by talking to an AI assistant. This project leverages multiple language models and cutting-edge technologies to generate production-ready Next.js code and preview it live in a secure sandbox.

> 💳 **Billing** is handled securely via [Clerk Billing](https://clerk.dev).  
> 🎨 Theme colors follow the **Twitter color scheme** via [`tweakcn`](https://github.com/tweakcn).  
> 🐳 **Docker** is used to run generated projects inside a sandbox environment without compatibility issues.

---




## 📚 Table of Contents

- [📸 Screenshots](#-screenshots)
- [🎯 Project Purpose](#-project-purpose)
- [🛠️ Technologies Used](#-technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [AI Integration](#ai-integration)
- [📂 Project Structure](#-project-structure)
- [📁 Key Files](#-key-files)
- [🚀 Getting Started](#-getting-started)
- [💡 Usage Flow](#-usage-flow)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 📸 Screenshots

<div align="center">
<img src="/screenshots/codey (1).png" alt="Screenshot 1" width="500"/>
</div>

<table align="center">
  <tr>
    <td><img src="/screenshots/codey (2).png" alt="Screenshot 2" width="500"/></td>
    <td><img src="/screenshots/codey (3).png" alt="Screenshot 3" width="500"/></td>
    <td><img src="/screenshots/codey (4).png" alt="Screenshot 4" width="500"/></td>
    <td><img src="/screenshots/codey (5).png" alt="Screenshot 5" width="500"/></td>
    <td><img src="/screenshots/codey (6).png" alt="Screenshot 5" width="500"/></td>
    <td><img src="/screenshots/codey (7).png" alt="Screenshot 5" width="500"/></td>
    <td><img src="/screenshots/codey (8).png" alt="Screenshot 5" width="500"/></td>


  </tr>
</table>

---

## 🎯 Project Purpose

This platform serves as a bridge between non-technical users and web development by enabling them to:

- Generate website projects using AI conversations
- Create complete frontend code with no coding experience
- Preview results instantly in a sandboxed environment
- Manage multiple projects with real-time tracking

---

## 🛠️ Technologies Used

### Frontend
[![Next.js](https://img.shields.io/badge/Next.js-15-blue)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Utility--First-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Accessible_Components-8B5CF6)](https://www.radix-ui.com/)
[![tRPC](https://img.shields.io/badge/tRPC-End--to--End_Typesafe_API-3178C6?logo=typescript)](https://trpc.io/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-Server_State-FF4154)](https://tanstack.com/query)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-Forms_with_Zod-EC5990?logo=react)](https://react-hook-form.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth_and_Billing-5F5CED?logo=clerk)](https://clerk.dev/)

### Backend
[![Next.js API Routes](https://img.shields.io/badge/Next.js_API-Routes-blue)](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql)](https://neon.tech/)
[![Inngest](https://img.shields.io/badge/Inngest-Background_Jobs-FBBF24)](https://www.inngest.com/)

### AI Integration
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT-412991?logo=openai)](https://openai.com/)
[![Anthropic](https://img.shields.io/badge/Anthropic-Claude-00B4D8)](https://www.anthropic.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_Model-4285F4?logo=google)](https://deepmind.google/technologies/gemini/)
[![E2B](https://img.shields.io/badge/E2B-Code_Execution-FFA500)](https://e2b.dev/)

> 🐳 Docker is used to run generated projects inside sandbox containers without compatibility issues.

---

## 📂 Project Structure

```

saas\_ai\_website\_builder/
├── prisma/               # Database schema
├── public/               # Static assets
├── sandbox-templates/    # Website templates
├── src/
│   ├── app/              # App Router pages
│   ├── components/       # Reusable components
│   ├── hooks/            # Custom hooks
│   ├── inngest/          # Background jobs
│   ├── lib/              # Utility functions
│   ├── modules/          # Features modules
│   ├── trpc/             # tRPC handlers
│   ├── middleware.ts     # Auth middleware
│   └── prompt.ts         # AI prompts
├── .env                  # Environment variables
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies
└── tsconfig.json         # TypeScript configuration

````

---

## 📁 Key Files

- `schema.prisma`: Data models
- `prompt.ts`: AI prompt logic
- `middleware.ts`: Auth and middleware logic
- `.env`: API keys and secrets

---

## 🔐 Environment Variables

To run this project, you need to set up the following environment variables in a `.env` file. You can use the `.env.example` as a template.

```env
# Database
DATABASE_URL="YOUR_POSTGRESQL_URL"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# AI Provider API Keys
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
ANTHROPIC_API_KEY="YOUR_ANTHROPIC_API_KEY"

# E2B Sandbox API Key
E2B_API_KEY="YOUR_E2B_API_KEY"

# Clerk Authentication and Billing
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="YOUR_CLERK_PUBLISHABLE_KEY"
CLERK_SECRET_KEY="YOUR_CLERK_SECRET_KEY"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL or Neon.tech
- API keys (OpenAI, Anthropic, Gemini, E2B, Clerk)

### Setup

```bash
git clone https://github.com/your-org/saas-ai-website-builder
cd saas-ai-website-builder

npm install

cp .env.example .env
# Fill in all API keys

npx prisma migrate dev

npm run dev
````

---

## 📝 Important Notes

- This version is experimental, expect occasional issues.
- Results improve as you use it — context builds over time.
- The project is fully open-source — feel free to fork, improve, or use with different models.
- 🔧 Code is ready — just plug in your `.env` file and run it locally.
- The system currently runs on Google Gemini API, which is powerful but can be unreliable or limited depending on usage.

---

## 💡 Usage Flow

1. Sign up using Clerk
2. Create a new website project
3. Describe your idea to the AI
4. Review and edit generated code
5. Preview in sandbox
6. Export or deploy

---

## 🚢 Deployment

Deploy easily to Vercel, Netlify, etc.

```bash
npm run build
npm run start
```

---

## 🤝 Contributing

We welcome contributions — especially in AI prompt engineering, UI/UX improvements, and API integrations.

```bash
# Fork
git checkout -b feature/your-feature-name
# After changes
git commit -m "feat: improved something"
git push origin feature/your-feature
```

Open a Pull Request 🚀

---

## 📄 License

© 2025 Hamzah Amir This code is licensed under the MIT License. Unauthorized commercial use without attribution is prohibited.
