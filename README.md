# 🧪 Testing Suite — React Component Testing

A production-ready **UI component testing project** built using **Jest** and **React Testing Library**, focused on reliability, automation, and real-world testing practices.

🔗 **Live Demo:** https://testing-suite-vert.vercel.app/
📂 **GitHub Repository:** https://github.com/vardhan999-hub/testing-suite

---

## 📌 Overview

Testing Suite is a modern React project designed to demonstrate **unit testing, interaction testing, and API mocking** for UI components.

Instead of manually verifying UI behavior, this project ensures correctness using **automated tests** that simulate real user interactions.

### 🚀 Key Highlights

* Automated UI testing using Jest
* Interaction testing using React Testing Library
* API mocking for reliable tests
* Accessibility-first testing approach
* High test coverage (90%+)

---

## ✨ Features

* 🔘 Button component with multiple variants and disabled state
* 🔢 Counter with increment, decrement, reset, min/max boundaries
* 📝 Controlled Input form with validation and error handling
* 🌐 Posts component with API integration
* ⏳ Loading, error, and empty state handling
* 🧪 Mocked API testing (no real network dependency)
* 📊 90%+ test coverage

---

## 🛠 Tech Stack

| Technology            | Purpose            |
| --------------------- | ------------------ |
| React 18              | UI components      |
| Jest                  | Test runner        |
| React Testing Library | UI testing         |
| Babel                 | JSX transformation |
| Vercel                | Deployment         |

---

## 📂 Project Structure

```
testing-suite/
│
├── src/
│   ├── components/
│   │   ├── Button/
│   │   ├── Counter/
│   │   ├── Input/
│   │   ├── Posts/
│   │
│   └── App.jsx
│
├── public/
├── setupTests.js
├── jest.config.js
├── babel.config.js
├── package.json
├── README.md
└── Prompts.md
```

---

## 🧪 Testing Approach

### 🔹 Level 1 — Unit Testing

* Components render correctly
* Props are displayed properly

### 🔹 Level 2 — Interaction Testing

* Button click events
* Counter updates
* Input typing behavior

### 🔹 Level 3 — API Mocking

* Mocked fetch calls
* No dependency on external APIs
* Controlled test data

---

## 📊 Test Coverage

* Statements: ~98%
* Branches: ~90%
* Functions: ~94%
* Lines: ~98%

---

## 🎯 Requirements Covered

### ✅ Level 1

* Component rendering tests
* Props validation

### ✅ Level 2

* User interaction testing
* State updates validation

### ✅ Level 3

* API mocking
* Loading, success, error, empty states

---

## 🚀 Running the Project

### Install dependencies

```
npm install
```

### Run app

```
npm start
```

### Run tests

```
npm test
```

### Generate coverage

```
npm run test:coverage
```

---

## 🎯 Key Concepts Demonstrated

* Testing user behavior instead of implementation
* Accessibility-based queries (getByRole)
* Mocking APIs for reliable tests
* Handling async UI states
* Writing scalable test cases

---

## 👨‍💻 Author

**Tadigadapa Harshavardhan**
https://github.com/vardhan999-hub
