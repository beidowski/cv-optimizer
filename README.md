# 🚀 CV Optimizer

**CV Optimizer** is a smart tool designed to help you quickly **tailor your CV** to any job description using the power of AI.

Simply paste your CV and the job description, and Google Gemini will analyze them to provide:
* 🎯 **A stronger professional summary**
* 📈 **Improved experience bullet points**
* 🔍 **Missing keywords for the specific role**
* 📊 **Rough ATS compatibility score & improvement tips**

> [!IMPORTANT]
> **Privacy-First:** Your Gemini API key is handled securely on the server side and never leaves the environment.

---

## 📸 Screenshots

### Ana Sayfa
![Main Page](https://github.com/user-attachments/assets/e0ddaf54-ac01-41f2-8138-485a8fec5c61)

### AI Analiz Sonuçları
![Analysis Result](https://github.com/user-attachments/assets/a8a21521-1ed5-4ab4-b1d3-2de5e44af6f7)

### Geçmiş & Şablonlar
![History & Templates](https://github.com/user-attachments/assets/a328517b-17eb-4a5c-891c-f74c3312e737)

---

## ✨ Features

- **Instant AI Feedback:** Paste your CV + Job Description and get immediate optimization tips.
- **Ready-made Templates:** Built-in examples to test the tool quickly.
- **AI Preview:** View suggestions and open them in the editor with a single click.
- **History:** Automatically saves your previous analyses in the browser using `localStorage`.
- **Modern UI:** Clean, responsive interface built with Tailwind CSS and shadcn/ui.

---

## 🛠 Tech Stack

* **Framework:** Next.js 15 (App Router + TypeScript)
* **AI Engine:** Google Gemini API
* **Styling:** Tailwind CSS + shadcn/ui
* **Storage:** LocalStorage (Client-side history)

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone [https://github.com/beidowski/cv-optimizer.git](https://github.com/beidowski/cv-optimizer.git)
cd cv-optimizer
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Set Up Environment Variables
Create a .env.local file in the root directory and add your Gemini API key:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```
You can get a free API key from Google AI Studio.

### 4. Run Locally
```bash 
npm run dev
```
Open http://localhost:3000 in your browser.

## 📋 Scripts
```bash
npm run dev – Starts the development server.

npm run build – Builds the application for production.

npm run lint – Runs ESLint to check for code quality.
```
## 🔐 Security & Deployment
The .env.local file is ignored by Git to keep your keys safe.

The API key is used strictly on the server side.

### Deployment: Recommended to deploy on Vercel. Make sure to add GEMINI_API_KEY to your environment variables in the Vercel Dashboard.

## ⚠️ Important Note
AI outputs are suggestions only. Always review and personalize the final CV with your own voice before applying to your dream job.
