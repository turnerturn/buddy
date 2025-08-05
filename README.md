
# 📚 faq-buddy

Welcome to your new #1 buddy at Ninja LLC!  
**faq-buddy** is a modern web portal that manages team knowledge through Notes and FAQs, and integrates an AI-powered chat assistant named **Buddy**. Buddy is embedded directly into the portal and trained to respond to natural-language support questions using curated FAQs and markdown-based IT instructions.

---

### 🤖 About Buddy

**Buddy** is a Copilot AI assistant designed to provide helpful, factual, and verifiable IT support guidance. It does **not guess** or fabricate answers. All responses are based on:

- 📄 **Agent Instructions**:  
  https://raw.githubusercontent.com/turnerturn/buddy/refs/heads/main/copilot-agent-instructions.md

- 🧾 **FAQs Markdown Source** (referenced in the instructions):  
  https://raw.githubusercontent.com/turnerturn/buddy/refs/heads/main/faqs.md

Buddy operates using a strict chronological precedence rule:  
> If two FAQs conflict, the most recent entry takes precedence.

If no match is found, Buddy encourages the user to update the FAQ or escalate to human IT support.

---

### 🔧 Key Features

#### 🌐 Navigation
- Responsive top app bar with hamburger menu
- Sidebar with links: Home, Notes, FAQs, Chat, Feedback

#### 📒 Notes & FAQs
- Vertical card list UI
  - Each card shows title, snippet, and tags
  - Inline fuzzy search
  - Tag-based filtering via multi-select dropdown
  - Edit modal for modifying or deleting entries

#### 💬 Chat Page
- SMS-style messaging UI (mobile + desktop optimized)
- Editable user messages (linked list-style history)
- Messages are sent to the OpenAI API through a **secure proxy**
- System prompt enforces Copilot rules (no guessing, only factual content)

#### 📝 Feedback Page
- Emoji-based rating input
- Open text comment box
- Submit button to collect user impressions

---

### 🧱 Project Structure

```bash
src/
├── components/
│   ├── NavBar.jsx
│   ├── Sidebar.jsx
│   ├── CardList.jsx
│   ├── EditModal.jsx
│   ├── TagFilter.jsx
│   └── ChatBox.jsx
├── pages/
│   ├── Home.jsx
│   ├── Notes.jsx
│   ├── FAQs.jsx
│   ├── Chat.jsx
│   └── Feedback.jsx
├── App.jsx
├── index.jsx
└── utils/
    └── fuzzySearch.js
```

---

### 🧩 Component Overview

| Component   | Purpose                                 |
|-------------|------------------------------------------|
| `NavBar`    | App bar with hamburger toggle            |
| `Sidebar`   | Drawer-style nav for switching pages     |
| `CardList`  | Displays Notes and FAQs as cards         |
| `EditModal` | Shared modal for editing or deleting     |
| `TagFilter` | Multi-select dropdown for tag filtering  |
| `ChatBox`   | Buddy chat interface with editable input |

---

### 🚦 Chat Behavior Rules

- The **system prompt** includes strict AI guidance:
  - Refer only to known instructions and FAQ content
  - Decline to answer when context is missing
- OpenAI API calls are made via a **secure proxy backend**
- API key is stored as a **GitHub Secret or environment variable**  
  (never exposed in the frontend)

---

### 💡 Best Practices

- React + React Router DOM for routing
- Fuse.js for fuzzy search logic
- State managed via `useState` and lifted via props/context where needed
- FAQs and instructions written in plain markdown, version-controlled in GitHub
- Use `uuid` or short unique strings for Note/FAQ IDs

---

### 🔐 Secure Usage Guidelines

Buddy does **not** embed API keys directly in frontend JavaScript.  
Instead:

- Use [Netlify Functions](https://docs.netlify.com/functions/overview/), [Vercel Functions](https://vercel.com/docs/functions), or a custom backend proxy.
- Store `OPENAI_API_KEY` as a **GitHub Secret** or in `.env`
- API requests route through a function like `/.netlify/functions/openai`

---

### 📎 Related Resources

- [Copilot Instructions (Markdown)](https://raw.githubusercontent.com/turnerturn/buddy/refs/heads/main/copilot-agent-instructions.md)
- [FAQs Markdown](https://raw.githubusercontent.com/turnerturn/buddy/refs/heads/main/faqs.md)
- [Bootstrap Components](https://getbootstrap.com/docs/5.3/components/)
- [OpenAI Chat API](https://platform.openai.com/docs/guides/gpt/chat-completions-api)

---

### 👥 Contributors

- Matt Turner — Project Owner & Developer
- CodeCommIT — Innovation Sprint Initiative Team

---

### 🚀 License

MIT License (or your preferred internal license terms)

---
