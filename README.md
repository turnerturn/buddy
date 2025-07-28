# buddy-portal
Your new #1 buddy at Oneok.  This portal allows you to manage notes and frequently asked questions.  Buddy is our embedded AI agent which is an expert of all things contained within your notes and faqs.  You can interact with our portal’s chat dialog to explore all content contained within the Buddy portal.  Use natural language questions to chat with Buddy.  Buddy will guide you through finding the answers you need.

### 🔧 Key Features

* **Navigation**

  * Top App Bar with hamburger menu (Material UI or Bootstrap)
  * Sidebar toggleable menu links: Home, Notes, FAQs, Chat, Feedback

* **Notes & FAQs Pages**

  * Vertical list of cards with:

    * Title, content snippet, tags in footer
    * Fuzzy search input
    * Advanced filter button (tag multi-select)
    * Edit modal (edit/save/delete)

* **Chat Page**

  * Chat UI with input and conversation history
  * Prompts to ask Buddy natural questions

* **Feedback Page**

  * Form with emoji ratings, comments, and submission

---

### 📁 Project Structure (Recommended)

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

### 🧱 Component Planning

| Component   | Purpose                                 |
| ----------- | --------------------------------------- |
| `NavBar`    | App bar with hamburger menu             |
| `Sidebar`   | Navigation menu rendered conditionally  |
| `CardList`  | Reusable for both Notes and FAQs        |
| `EditModal` | Shared edit/delete modal for Notes/FAQs |
| `TagFilter` | Multi-select filter popover             |
| `ChatBox`   | Chat UI to interact with Buddy          |

---

### 📌 Best Practices

* React Router DOM for page routing
* Local state management via `useState`, or lift to context if shared
* Tag filtering and fuzzy search implemented using `fuse.js`
* Reusable components for Notes & FAQs
* Use `uuid` for content identifiers
