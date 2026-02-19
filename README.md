# Evan Yifeng Liu - Academic Portfolio Website

A minimalist, research-focused personal website built with **React**, **Tailwind CSS**, and **Google Gemini AI**. 

This project is designed to be easily editable without touching complex code. All content is organized in the `data/` folder.

## 📂 Project Structure

- `data/`: **START HERE.** This folder contains all your content separated by category.
  - `profile.ts`: Bio, email, and social links.
  - `technicalProjects.ts`: Robotics and OR projects.
  - `designProjects.ts`: Architecture projects.
  - `publications.ts`: List of papers.
  - `blogPosts.ts`: Blog entries.
- `App.tsx`: The main layout and page logic.
- `components/`: Reusable UI elements (Navbar, ChatWidget, etc.).

---

## 📝 How to Edit Content

You do not need to modify HTML or React components to change the text. 

### 1. Adding a Technical Project
Open `data/technicalProjects.ts` and add a new object to the array:

```typescript
{
  id: "unique-id",
  title: "Project Title",
  description: "Short description for the card...",
  tags: ["Tool 1", "Tool 2"],
  image: "https://link-to-thumbnail.jpg",
  // Optional: Add 'details' for a case study page
  details: {
    subtitle: "Subtitle",
    challenge: "Problem statement...",
    solution: "Methodology...",
    results: "Outcome...",
    additionalImages: ["url1", "url2"]
  }
}
```

### 2. Adding a Publication
Open `data/publications.ts` and add a new entry.

### 3. AI Assistant Context
The AI Chatbot reads directly from your data files. You don't need to manually update the AI context; it will automatically know about your new projects when you add them to the data files.

---

## 🚀 How to Publish to GitHub

1. **Create a Repository** on GitHub.
2. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

---

## 💻 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
