# gold digger app
an app that helps you buy digital gold in one click and send a receipt to your mail

# 📊 GoldDigger App

GoldDigger is a modern, full-stack web application built to help individuals buy and track digital gold at a single click. The application features a real-time price streaming engine and an automated serverless data pipeline that generates and dispatches isolated transaction receipts straight to the user's inbox upon purchase.

🚀 **Live Demo:** [gold-digger-app.vercel.app](https://gold-digger-app.vercel.app/)

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** HTML5, Semantic CSS3, Vanilla JavaScript (Browser API)
- **Backend Infrastructure:** Node.js (ECMAScript Modules / ES6)
- **Serverless API Hosting:** Vercel Serverless Functions (`@vercel/node`)
- **Real-Time Data Streaming:** Server-Sent Events (SSE) Protocol
- **Transactional Mail Pipeline:** Resend Email REST API

---

## 💡 What I Learnt Building My First Node.js App

Building GoldDigger was a massive milestone as my very first deep-dive into full-stack backend engineering. Moving out of the sandbox and into a production cloud environment taught me crucial industry lessons:

1. **Monolithic vs. Serverless Infrastructure:** I learned how traditional persistent servers (`http.createServer` loops running 24/7) differ fundamentally from Event-Driven Cloud Architecture (Stateless Serverless Functions). 
2. **Advanced Network Protocols:** I mastered implementing **Server-Sent Events (SSE)** via Node's chunked `res.write` data streams to push real-time asset price fluctuations to the client UI without clunky page-refreshes.
3. **Enterprise Data Handling:** I learned how to isolate user data securely on the fly using Node.js memory buffers (`Buffer.from`) for single-receipt email attachments, ensuring private transaction records are never cross-exposed.
4. **Cloud Security Operations:** I learned how to manage production secrets properly by abstracting sensitive client credentials out of code files using `.env` files and managing environment variables securely within a live cloud console dashboard.

---

## 📈 How I Have Improved as a Developer

If you look through the commit history of this project, you will see a massive, undeniable transformation in my engineering capabilities:

* **From Local Paths to Absolute Gateways:** I started by writing local path shortcuts (`./invest`) which break on the cloud. I improved by mastering absolute routing architecture (`/invest`) and advanced edge proxy setups using `vercel.json` rewrites.
* **From CommonJS to Modern ESM Architecture:** I overcame severe compiler dependency barriers (`ERR_REQUIRE_ESM`) by learning how to configure custom package rules (`"type": "module"`) and resolving complex legacy CommonJS packaging conflicts using `createRequire`.
* **From Silent Network Freezes to Resilient APIs:** My early features were trapped in silent network freezes due to restricted cloud ports. I shifted my entire mindset away from legacy SMTP email protocols and upgraded to modern, firewall-proof HTTPS Web REST APIs (Resend).
* **Defensive Error Handling:** I improved my codebase from dropping raw server errors to writing graceful catch-blocks that securely parse backend diagnostics while keeping the frontend UI alive, polished, and responsive.

---

## ⚙️ Local Installation & Development

To run this project locally on your machine:

1. Clone the repository:
   ```bash
   git clone https://github.com
   cd gold-digger-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your secret credentials:
   ```text
   RESEND_API_KEY=your_resend_api_key_here
   ```

4. Launch the local development server:
   ```bash
   node server.js
   ```

5. Open your browser and navigate to `http://localhost:8000`
