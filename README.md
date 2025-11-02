# 🚀 GitHub Bookmarks App

A sleek and responsive **React + TypeScript** application that lets you **search GitHub repositories** and **bookmark** your favorites for later viewing.  
Built with **React + Vite**, **TailwindCSS**, and **TypeScript**, this project demonstrates clean frontend architecture, modular component design, and debounced API querying for performance.

---

## 🚀 Features

- 🔍 Search GitHub Repositories using the GitHub public API 
- ⏱️ Debounced Input to reduce API calls and improve performance  
- ⭐ Bookmark Repositories and persist them in local storage 
- 🧭 Toggle Between Search Results and Bookmarks
- 🎨 Responsive Design with TailwindCSS 
- ⚡ Instant Development Experience with Vite 

---

## 🎨 Design Decisions

- TailwindCSS allowed for faster styling iteration without CSS boilerplate.

- TypeScript ensures better scalability and reduces runtime errors.

- Implemented a custom useDebounce hook to prevent excessive GitHub API requests when typing.

- Used LocalStorage for simplicity and offline persistence.

- GitHub’s public API rate limit (60 requests/hour for unauthenticated users) is acknowledged.


---

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: TailwindCSS
- **TypeScript** — Type-safe, maintainable code
- **LocalStorage** — Persistent bookmarking between sessions
- **ESLint + Prettier** — Code linting and formatting 
- **Deployment**: Vercel

---

## 🗂 Folder Structure

Github Bookmarks App/
- src/
  - components/
    - RepoCard.tsx
    - SearchBar.tsx
  - hooks/
    - useDebounce.tsx
  - App.tsx # Root component
  - main.tsx # Entry point
  - index.css
- index.html
- package.json
- package-lock.json
- tailwind.config.js
- postcss.config.js
- tsconfig.json
- README.md

---

## 📦 Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/Amrit-2708/Github-Bookmark-App
cd github-bookmark-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```

---

