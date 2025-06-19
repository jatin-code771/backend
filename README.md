# 🛡️ User Authentication System (Cohort Based)

This is a Node.js-based authentication system built using Express, with secure practices like JWT tokens, cookie handling, validation, and modern authentication protocols. Designed as part of a cohort-based learning project.

---





## 🌐 Authentication Standards

* JWT (JSON Web Token)
* Refresh tokens
* Access tokens
* Google Auth
* OAuth 2.0
* OpenID Connect
* OpenID Standards
* SAML
* JWKS (not jwt)

---

## 📁 Project Structure

```
.
├── controller/
│   └── user.controller.js
├── routes/
│   └── user.routes.js
├── utils/
│   └── db.js
├── .env
├── package.json
└── index.js  (main file)
```

---

## 🧹 Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* bcrypt
* JWT
* dotenv
* cookie-parser

---



```bash
# Clone the repository
git clone https://github.com/yourusername/auth-system.git

# Navigate to the project directory
cd auth-system

# Install dependencies
npm install

# Setup .env file
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Start the server
npm start
```





