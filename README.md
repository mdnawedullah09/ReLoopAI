# ReLoopAI ♻️

**Turn waste into business opportunities with AI.**

ReLoopAI is an AI-powered web application that analyzes a waste material and suggests three potential business opportunities. It provides estimated startup costs, selling prices, expected profits, and explanations to help users explore sustainable entrepreneurship.

## ✨ Features

- ♻️ Analyze waste materials using AI.
- 💡 Generate three potential business ideas.
- 💰 View estimated startup costs, selling prices, and expected profits in INR.
- 🌱 Explore ways to reuse waste and support a circular economy.
- ⚡ Interactive React frontend connected to a FastAPI backend.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, JavaScript, CSS
- **Backend:** Python, FastAPI
- **AI:** Google Gemini API

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Python 3.10+ (use a compatible version for your dependencies)
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd ReLoopAI
```

Replace `YOUR_REPOSITORY_URL` with your GitHub repository URL after creating the repository.

### 2. Set up the backend

Open a terminal in the project folder:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` folder:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace the placeholder with your own API key. Never commit or share your real API key.

Start the backend:

```powershell
uvicorn main:app --reload
```

The API will usually be available at `http://127.0.0.1:8000`.

API documentation: `http://127.0.0.1:8000/docs`

### 3. Set up the frontend

Open a second terminal in the project root:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## 🔐 Security

- Keep API keys in `backend/.env`.
- Do not commit `.env`, virtual environments, or `node_modules`.
- Use environment variables for secrets.

## 🌍 Vision

ReLoopAI aims to encourage sustainable thinking by helping people discover useful and potentially profitable ways to repurpose waste.

## 📄 License

No license has been selected yet. Add a license before allowing others to reuse the project under specific terms.
