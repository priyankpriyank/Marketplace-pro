# 🛒 React Marketplace App

This is a fully functional marketplace web application built with **React.js** and **Supabase**. Users can register, log in, create listings, view others' listings, and chat with sellers directly.

---

## 🚀 Features

- 🔐 User Authentication (Login / Register via Supabase Auth)
- 📦 Add, View, Edit Listings
- 💬 Real-time Messaging System
- 🏠 Home page with listings feed
- 📱 Responsive Design with Tailwind CSS
- ⚙️ Supabase as the backend (Database + Auth)

---

## 📁 Project Structure

Marketplace-pro/
│
├── public/ # Static files
├── src/
│ ├── components/
│ │ ├── Chat/
│ │ ├── Listings/
│ │ └── Navbar.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ └── NotFound.jsx
│ ├── component/
│ │ └── auth/ # Login & Register
│ ├── services/
│ │ └── supabaseClient.js
│ ├── App.js
│ ├── index.js
│ └── index.css
├── .env # Environment variables (add your Supabase keys here)
├── package.json
└── tailwind.config.js

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/priyankpriyank/marketplace-pro
cd marketplace-pro

npm install

npm start