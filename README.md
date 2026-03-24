# CV Optimizer

A lightweight tool to improve your CV based on a specific job posting.
Paste your CV and the job description, and the AI will refine your summary and experience bullets, highlight missing keywords, and provide a basic ATS compatibility analysis.

🧱 Tech Stack

* Next.js
* Google Gemini (API key is securely stored on the server)

🚀 Quick Start
npm install
textCreate a .env.local file in the root directory:
GEMINI_API_KEY=your_api_key
textGenerate your key via Google AI Studio.
Check .env.example for reference variable names.
Never commit real keys.
npm run dev
textOpen in browser:
http://localhost:3000

📄 Features

Page | Description
--- | ---
Home | Paste CV + job description → run analysis
Templates | Ready-made samples; preview with AI or open in editor
History | Stores recent runs in localStorage
About | Short project overview

🛠️ Scripts
npm run dev     # development
npm run build   # build
npm run start   # run production
npm run lint    # lint
text🔐 Security

* Never commit .env.local (already ignored).
* Define GEMINI_API_KEY as an environment variable in your hosting platform.

🌍 Deployment

Since the app uses API routes, GitHub Pages alone is not sufficient.
Deploying on platforms like Vercel is the easiest approach.

⚠️ Disclaimer

Outputs are suggestions.
Always review and adapt them to match your own voice before applying.
Tamam, direkt kopyala-yapıştır yapabilirsin. Yukarıdaki her şeyi seçip kopyala ve README.md dosyana yapıştır.1,8 saniyeHızlıcvv optimiser ana baslıgının altında tek dosyaaaaaMarkdown# CV Optimizer

A lightweight tool to improve your CV based on a specific job posting. Paste your CV and the job description, and the AI will refine your summary and experience bullets, highlight missing keywords, and provide a basic ATS compatibility analysis.

🧱 Tech Stack

* Next.js
* Google Gemini (API key is securely stored on the server)

🚀 Quick Start
npm install
textCreate a .env.local file in the root directory:
GEMINI_API_KEY=your_api_key
textGenerate your key via Google AI Studio.  
Check .env.example for reference variable names.  
Never commit real keys.
npm run dev
textOpen in browser:  
http://localhost:3000

📄 Features

| Page       | Description                                              |
|------------|----------------------------------------------------------|
| Home       | Paste CV + job description → run analysis                |
| Templates  | Ready-made samples; preview with AI or open in editor    |
| History    | Stores recent runs in localStorage                       |
| About      | Short project overview                                   |

🛠️ Scripts
npm run dev     # development
npm run build   # build
npm run start   # run production
npm run lint    # lint
text🔐 Security

* Never commit .env.local (already ignored).
* Define GEMINI_API_KEY as an environment variable in your hosting platform.

🌍 Deployment

Since the app uses API routes, GitHub Pages alone is not sufficient.  
Deploying on platforms like Vercel is the easiest approach.

⚠️ Disclaimer

Outputs are suggestions.  
Always review and adapt them to match your own voice before applying.
