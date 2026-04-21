// src/components/Counter/Counter.jsx
// ─────────────────────────────────────────────────────────────
//  Counter component — the perfect Level 2 interaction target
//  Props:
//    initialValue – starting count  (default: 0)
//    step         – amount to inc/dec (default: 1)
//    min          – minimum allowed value (default: 0)
//    max          – maximum allowed value (default: 10)
// ─────────────────────────────────────────────────────────────

import React, { useState } from "react";

const containerStyle = {
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  padding: "24px",
  borderRadius: "12px",
  background: "#f9fafb",
  border: "2px solid #e5e7eb",
  fontFamily: "inherit",
};

const countStyle = {
  fontSize: "48px",
  fontWeight: "700",
  color: "#111827",
  lineHeight: 1,
  minWidth: "60px",
  textAlign: "center",
};

const rowStyle = {
  display: "flex",
  gap: "8px",
};

const btnBase = {
  padding: "10px 20px",
  borderRadius: "8px",
  fontSize: "18px",
  fontWeight: "700",
  border: "none",
  cursor: "pointer",
  transition: "background 0.15s",
};

function Counter({ initialValue = 0, step = 1, min = 0, max = 10 }) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => Math.min(c + step, max));
  const decrement = () => setCount((c) => Math.max(c - step, min));
  const reset = () => setCount(initialValue);

  return (
    <div style={containerStyle} data-testid="counter" role="group" aria-label="counter">
      <div
        style={countStyle}
        data-testid="counter-value"
        role="status"
        aria-label="count"
        aria-live="polite"
      >
        {count}
      </div>

      <div style={rowStyle}>
        <button
          style={{ ...btnBase, background: "#fee2e2", color: "#991b1b" }}
          onClick={decrement}
          disabled={count <= min}
          data-testid="decrement-btn"
          aria-label="Decrement"
        >
          −
        </button>

        <button
          style={{ ...btnBase, background: "#dcfce7", color: "#166534" }}
          onClick={increment}
          disabled={count >= max}
          data-testid="increment-btn"
          aria-label="Increment"
        >
          +
        </button>
      </div>

      <button
        style={{
          ...btnBase,
          fontSize: "13px",
          padding: "6px 16px",
          background: "#e5e7eb",
          color: "#374151",
        }}
        onClick={reset}
        data-testid="reset-btn"
        aria-label="Reset"
      >
        Reset
      </button>
    </div>
  );
}

export default Counter;
