<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# LeetAi

LeetAi is a performance dashboard that analyzes a user's LeetCode profile and generates a personalized DSA + interview preparation roadmap.

It is built for freshers who want to understand how ready they are for coding interviews and what to improve next.


## 🚀 Overview

LeetAi transforms raw LeetCode stats into structured insights:

- Computes an **Interview Readiness Score (0–100)**
- Detects **weak topic areas**
- Generates an **adaptive weekly roadmap**
- Recommends the **next 5 problems**
- Produces a concise **AI performance summary**

Instead of solving random problems, users get a clear, evolving plan.

## 🎯 Target Users

- Final-year students
- Internship seekers
- Fresh graduates preparing for interviews
- Early job switchers strengthening DSA

## 🧠 Core Features

### 1. Interview Readiness Score
A composite score based on:
- Topic coverage
- Difficulty distribution
- Consistency over time
- Contest exposure

### 2. Skill Breakdown
Topic-wise strength analysis:
- Arrays
- Strings
- Trees
- Graphs
- Dynamic Programming
- Greedy
- And more

### 3. Weak Area Detection
Identifies:
- Under-practiced topics
- Difficulty imbalance
- Avoidance patterns

### 4. Adaptive Roadmap
A weekly structured plan that:
- Focuses on weak areas
- Reinforces medium-level problems
- Includes stretch challenges

### 5. Next 5 Recommended Problems
Deterministic, logic-driven problem selection based on current skill gaps.

### 6. Weekly AI Report
Concise performance summary with actionable feedback.

## 🏗️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS (Dark mode, bento grid layout)
- Axios
- lucide-react

Deployed on: **Vercel**

### Backend
- Spring Boot 3.x
- Maven
- Lombok

Responsibilities:
- Fetch and cache LeetCode profile data
- Compute skill vector
- Calculate readiness score
- Generate roadmap logic
- Integrate AI analysis

Deployed on: **Render**

## 🔌 APIs Used

- LeetCode Stats API  
  `leetcode-restful-api.vercel.app`

- AI Analysis  
  Groq (Llama 3.1 free tier)


## 📌 Project Goal

LeetAi is a polished side project focused on demonstrating:

- Backend metric design
- Scoring system logic
- Personalized roadmap generation
- Clean frontend architecture
- AI integration in a structured system

Core question it answers:

> How close am I to getting hired, and what should I work on next?


## 📈 Future Improvements (Optional)

- Company-specific prep modes (FAANG, product, service-based)
- Mock interview simulation
- College-based ranking comparison
- Progress tracking over time
- Resume strength insights


## 🛠️ Setup (Basic Structure)

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
mvn spring-boot:run
```
>>>>>>> 3737cbb80ab67aade81c9316d3b4d95024efcf48
