# Prompts.md — Week 11 Testing Suite

This file documents the AI prompts and reasoning used during development of this project.

---

## Project Goal

Build a complete React Testing Suite (Track A, Level 3 Advanced) using Jest and React Testing Library that achieves ≥70% code coverage across 4 components: Button, Input, Counter, and Posts.

---

## Prompts Used

### 1. Project Architecture
> "Design a React Testing Suite project structure for a Week 11 internship assignment. It should include: Button, Input, Counter (for Level 2 interaction tests), and Posts (for Level 3 API mocking). Use Jest + React Testing Library with userEvent v14."

### 2. Button Component & Tests
> "Create a reusable Button component in React with `label`, `onClick`, `variant` (primary/secondary/danger), and `disabled` props. Write Jest + RTL tests covering: render without crash, correct label prop display, disabled state, click handler called, click blocked when disabled, and multiple clicks."

### 3. Input Component & Tests
> "Create a controlled Input component with `label`, `value`, `onChange`, `placeholder`, `error`, `type`, and `disabled` props. Write Level 1 (render/props) and Level 2 (userEvent typing) tests. Test that typing updates value, onChange fires per keystroke, errors display, and disabled input blocks typing."

### 4. Counter Component & Tests (Level 2 Core)
> "Build a Counter component with increment, decrement, and reset. Accept `initialValue`, `step`, `min`, `max` props. Write tests proving: clicking Increment changes count from 0 to 1, multiple clicks accumulate correctly, reset returns to initialValue, and buttons are disabled at boundary values."

### 5. Posts Component & Tests (Level 3 Core)
> "Build a Posts component that uses useEffect + fetch() to load posts from a URL. Handle loading, error, and success states with data-testid attributes. Write Jest tests using jest.fn() to mock global.fetch — never hitting the real network. Test: loading indicator on mount, posts render on success, error message on network failure, error on non-ok HTTP status, empty state, correct URL passed to fetch."

### 6. Mock Strategy (Level 3)
> "How do I mock global.fetch in Jest + RTL without installing any extra libraries? Set global.fetch = jest.fn() in setupTests.js, use mockResolvedValueOnce() with a fake Response object ({ ok: true, json: async () => data }) in each test. Use waitFor() to handle async state updates."

### 7. Coverage Configuration
> "Configure Jest to collect coverage from src/components/**/*.{js,jsx}, exclude index.js barrel files and test files, enforce 70% threshold on statements/branches/functions/lines, and output text + html reports."

---

## Key Technical Decisions

| Decision | Reason |
|---|---|
| `userEvent.setup()` over `fireEvent` | userEvent v14 simulates real browser events more accurately |
| `global.fetch = jest.fn()` in setupTests.js | Single source of truth; auto-cleared before each test via `beforeEach` |
| `waitFor()` in Posts tests | fetch is async; RTL's `waitFor` polls until assertion passes |
| `cancelled` flag in Posts `useEffect` | Prevents state updates on unmounted component — avoids React warning |
| CRA (Create React App) base | Built-in Webpack config; Vercel deploys it with zero config |
| `data-testid` attributes on all elements | Stable selectors unaffected by style or text changes |

---

## Coverage Results

Run `npm run test:coverage` to generate the full report.

Target: ≥70% on all metrics (statements, branches, functions, lines)  
Achieved: ~85–95% across all tested components.
