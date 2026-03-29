# 👗 AI-Powered Virtual Try-On E-Commerce Platform

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-orange.svg)](https://ai.google.dev/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment-blueviolet.svg)](https://razorpay.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🌟 Overview

**Fashion AI** is a complete e-commerce platform with an innovative AI-powered virtual try-on feature. Customers can upload their photo and see how clothes look on them before making a purchase. Built with modern technologies including React, Java Spring Boot, and Google's Gemini AI.

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 👕 **AI Virtual Try-On** | Upload your photo and see yourself wearing any dress using Google Gemini AI |
| 🛒 **Full E-Commerce** | Complete shopping experience with cart, checkout, and payment |
| ❤️ **Wishlist** | Save your favorite items for later |
| 👤 **User Authentication** | Sign up and login with secure localStorage storage |
| 💳 **Payment Integration** | Razorpay payment gateway with test mode |
| 🌙 **Dark Mode** | Toggle between light and dark themes |
| 📱 **Responsive Design** | Works seamlessly on mobile, tablet, and desktop |

---

## 🏗️ Architecture
┌─────────────────────────────────────────────────────────────┐
│ User Browser │
│ (React Frontend) │
│ Port: 5173 │
└─────────────────────────────────────────────────────────────┘
│ │
▼ ▼
┌─────────────────────┐ ┌─────────────────────┐
│ Java Backend │ │ Python Backend │
│ (Payments) │ │ (AI Try-On) │
│ Port: 8080 │ │ Port: 3001 │
└─────────────────────┘ └─────────────────────┘
│ │
▼ ▼
┌─────────────────────┐ ┌─────────────────────┐
│ Razorpay API │ │ Google Gemini │
│ (Test Mode) │ │ (Image Generation)│
└─────────────────────┘ └─────────────────────┘

text

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 | UI components & state management |
| | React Router DOM | Page navigation |
| | Ant Design | UI component library |
| | Axios | API calls |
| | Vite | Build tool |
| **Backend (Payments)** | Java 17 | Core backend language |
| | Spring Boot 3.2.5 | REST API framework |
| | Razorpay SDK | Payment integration |
| **Backend (AI)** | Python 3.13 | AI/ML processing |
| | FastAPI | REST API |
| | Google Gemini API | Image generation |
| **Database** | H2 (in-memory) | Order storage (test mode) |
| **Authentication** | localStorage | User session management |

---

## 📁 Project Structure
Gen-AI-Virtual-Try-On-Clothes/
├── frontend/ # React Application
│ ├── src/
│ │ ├── assets/ # Images & static files
│ │ ├── components/ # Reusable components
│ │ │ ├── Navbar.jsx
│ │ │ ├── ProductCard.jsx
│ │ │ ├── ImageUpload.jsx
│ │ │ └── Footer.jsx
│ │ ├── pages/ # Main pages
│ │ │ ├── Home.jsx
│ │ │ ├── Cart.jsx
│ │ │ ├── TryOn.jsx # AI try-on core
│ │ │ ├── Likes.jsx
│ │ │ ├── Login.jsx
│ │ │ └── Checkout.jsx
│ │ ├── context/ # State management
│ │ │ └── CartContext.jsx
│ │ ├── data/ # Static data
│ │ │ └── products.js # 23+ products
│ │ ├── App.jsx
│ │ └── index.css
│ ├── package.json
│ └── vite.config.js
│
├── backend-java/ # Java Spring Boot Backend
│ ├── src/main/java/com/fashionai/payment/
│ │ ├── controller/
│ │ │ └── PaymentController.java
│ │ ├── service/
│ │ └── model/
│ ├── src/main/resources/
│ │ └── application.properties
│ └── pom.xml
│
├── backend/ # Python Backend (AI)
│ ├── routers/
│ │ └── tryon.py
│ ├── main.py
│ └── requirements.txt
│
├── examples/ # Sample images for testing
└── screenshots/ # Project screenshots

text

---

## 🚀 Installation & Setup

### Prerequisites

| Software | Version | Download |
|----------|---------|----------|
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| Java JDK | 17+ | [oracle.com/java](https://oracle.com/java) |
| Python | 3.8+ | [python.org](https://python.org) |
| Git | Latest | [git-scm.com](https://git-scm.com) |

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/Gen-AI-Virtual-Try-On-Clothes.git
cd Gen-AI-Virtual-Try-On-Clothes
Step 2: Setup Frontend
bash
cd frontend
npm install
npm run dev
Frontend runs at: http://localhost:5173

Step 3: Setup Backend (Payments)
bash
cd backend-java
.\mvnw spring-boot:run   # Windows
./mvnw spring-boot:run   # Mac/Linux
Backend runs at: http://localhost:8080

Step 4: Setup Backend (AI - Optional)
bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 3001
AI backend runs at: http://localhost:3001

Step 5: Configure API Keys
Google Gemini API Key
Go to Google AI Studio

Create an API key

Add to frontend/src/pages/TryOn.jsx:

javascript
const GOOGLE_API_KEY = "AIzaSy...";
Razorpay Test Keys (for Payments)
Go to Razorpay Dashboard

Enable Test Mode

Generate test API keys

Update backend-java/src/main/resources/application.properties:

properties
razorpay.key.id=rzp_test_...
razorpay.key.secret=...
🧪 Testing
Test Payment (Test Mode)
Field	Value
Card Number	4111 1111 1111 1111
Expiry	Any future date (e.g., 12/25)
CVV	Any 3 digits
OTP	Any 6 digits
📸 Screenshots
Homepage	Try-On Page	Checkout
https://screenshots/s1.png	https://screenshots/s2.png	https://screenshots/s3.png
Cart Page	Payment	Result
https://screenshots/s4.png	https://screenshots/s5.png	https://screenshots/s6.png
🎯 Features in Detail
AI Virtual Try-On
Uses Google Gemini 3.1 Flash Image (Nano Banana 2) model

Converts images to base64 and sends to API

Returns realistic try-on image in 10-15 seconds

Saves results to history with timestamps

Shopping Cart
Add/remove items with quantity updates

Real-time total calculation

Persistent storage with localStorage

Payment Integration
Razorpay test mode for safe testing

Complete order creation and verification flow

Success/failure handling with redirects

User Authentication
Sign up with email and password

Login with localStorage persistence

Welcome message for logged-in users

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Authors
Jeevanithiya V	Full Stack Developer

Acknowledgments
Google Gemini API for AI image generation

Razorpay for payment integration

Ant Design for UI components

📧 Contact
For any queries, please reach out:

Email: jeevanithiyavelu@gmail.com

GitHub: nithiyavelu

