# 🧪 Testing Suite — Week 11 | Track A Level 3 (Advanced)

A production-grade React Testing Suite built with **Jest** and **React Testing Library**, demonstrating Unit Testing, Interaction Testing, and API Mocking with ≥70% code coverage.

---

## 📁 Project Structure

```
testing-suite/
│
├── package.json          # Scripts, deps, Jest config & coverage thresholds
├── jest.config.js        # Jest environment, transforms, coverage settings
├── babel.config.js       # Babel: @babel/preset-env + @babel/preset-react
├── setupTests.js         # jest-dom matchers + global fetch mock
├── .gitignore
├── README.md
├── Prompts.md            # AI prompts & technical decisions log
│
├── public/
│   └── index.html        # CRA entry HTML
│
├── src/
│   ├── index.js          # React root
│   ├── App.jsx           # Live demo of all components
│   │
│   └── components/
│       ├── Button/
│       │   ├── Button.jsx       ← Reusable button (3 variants, disabled)
│       │   ├── Button.test.js   ← Level 1 + 2 tests
│       │   └── index.js
│       │
│       ├── Input/
│       │   ├── Input.jsx        ← Controlled input (label, error, disabled)
│       │   ├── Input.test.js    ← Level 1 + 2 tests (userEvent typing)
│       │   └── index.js
│       │
│       ├── Counter/
│       │   ├── Counter.jsx      ← Stateful counter (min/max/step/reset)
│       │   ├── Counter.test.js  ← Level 2 tests (click → state changes)
│       │   └── index.js
│       │
│       └── Posts/
│           ├── Posts.jsx        ← Fetches API data, handles loading/error
│           ├── Posts.test.js    ← Level 3 tests (mocked fetch, no network)
│           └── index.js
│
└── coverage/             ← Auto-generated (git-ignored)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 16
- npm ≥ 8

### Install
```bash
git clone <your-repo-url>
cd testing-suite
npm install
```

### Run the App
```bash
npm start
# Opens http://localhost:3000
```

### Run Tests
```bash
# Run all tests (single pass)
npm test

# Run with verbose output
npm run test:verbose

# Run in watch mode (re-runs on file save)
npm run test:watch

# Generate coverage report (enforces ≥70% threshold)
npm run test:coverage
```

---

## ✅ Test Coverage by Level

### Level 1 — Render & Props
| Component | Tests |
|---|---|
| Button | Renders, displays label, disabled state, aria-disabled |
| Input | Renders, label, placeholder, error message, no-error, disabled, aria-invalid |
| Counter | Renders, initial value, custom initialValue, all 3 buttons present, boundary disabled states |

### Level 2 — Interaction (userEvent)
| Component | Tests |
|---|---|
| Button | onClick fires once, not fired when disabled, fires multiple times |
| Input | Typing updates value, onChange fires per keystroke, clear works, disabled blocks typing |
| Counter | Increment → count changes to 1, multiple increments accumulate, decrement works, reset returns to initialValue, max boundary, min boundary, custom step |

### Level 3 — Mocked API (Posts)
| Scenario | Test |
|---|---|
| Loading state | Loading indicator shown on mount |
| Success | Post cards rendered with correct title and body |
| Correct URL | fetch() called with the exact apiUrl prop |
| Empty array | Empty message shown |
| Network error | Error message displayed (no post cards) |
| HTTP 500 error | Error message with status code |
| No real network | fetch call count verified (mock intercepted it) |

---

## 🔍 How API Mocking Works (Level 3)

```js
// setupTests.js — runs before every test file
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear(); // reset between tests
});

// In Posts.test.js — control what fetch "returns"
global.fetch.mockResolvedValueOnce({
  ok: true,
  status: 200,
  json: async () => [{ id: 1, title: "Test Post", body: "Hello" }],
});
```

The test never touches the internet. `global.fetch` is a Jest mock that returns exactly what the test tells it to. This makes tests fast, deterministic, and offline-capable.

---

## 📊 Coverage Report

After running `npm run test:coverage`, open `coverage/lcov-report/index.html` in your browser for the full visual report.

Enforced thresholds (will fail CI if not met):
- Statements ≥ 70%
- Branches ≥ 70%
- Functions ≥ 70%
- Lines ≥ 70%

---

## 🌐 Deployment

**Frontend → Vercel**

```bash
# Option A: Vercel CLI
npm install -g vercel
vercel

# Option B: Push to GitHub → import on vercel.com → auto-deploy
```

Vercel auto-detects Create React App. No extra config needed.

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Jest | 29 | Test runner |
| @testing-library/react | 14 | Component rendering in tests |
| @testing-library/user-event | 14 | Realistic user interaction simulation |
| @testing-library/jest-dom | 6 | Custom DOM matchers (toBeInTheDocument, etc.) |
| babel-jest | 29 | JSX transform for Jest |
| jest-environment-jsdom | 29 | Simulated browser DOM in Node |

---

## 👨‍💻 Author

**Week 11 Internship — Track A: Frontend Specialist**  
Submission Deadline: Friday 11:59 PM  
Contact: Mr. Nakul | 8851407750 (Mon–Fri, 9AM–6PM)
