// src/App.jsx
// ─────────────────────────────────────────────────────────────
//  Main App — showcases all tested components in a live demo UI
//  This is the visual proof that components work in the browser too.
// ─────────────────────────────────────────────────────────────

import React, { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Counter from "./components/Counter";
import Posts from "./components/Posts";

const appStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
  fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  color: "#f8fafc",
  padding: "0",
};

const headerStyle = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(12px)",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  padding: "20px 40px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const badgeStyle = {
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  color: "#fff",
  fontSize: "11px",
  fontWeight: "700",
  padding: "4px 10px",
  borderRadius: "20px",
  letterSpacing: "0.05em",
};

const mainStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "48px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "40px",
};

const sectionStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  padding: "32px",
};


const sectionHeadingStyle = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#f1f5f9",
  marginBottom: "6px",
};

const sectionSubStyle = {
  fontSize: "14px",
  color: "#94a3b8",
  marginBottom: "28px",
};

const rowStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  alignItems: "center",
};

const dividerStyle = {
  border: "none",
  borderTop: "1px solid rgba(255,255,255,0.06)",
  margin: "24px 0",
};

// ── Form demo state ───────────────────────────────────────────

function FormDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!email.includes("@")) e.email = "Enter a valid email address.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setSubmitted(false);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div>
      {submitted ? (
        <div
          style={{
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.3)",
            borderRadius: "10px",
            padding: "20px",
            color: "#86efac",
            fontSize: "15px",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          ✓ Form submitted! Hello, {name}.
        </div>
      ) : null}
      <Input
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Alice Johnson"
        error={errors.name}
      />
      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="e.g. alice@example.com"
        error={errors.email}
      />
      <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
        <Button label="Submit" onClick={handleSubmit} variant="primary" />
        <Button label="Reset" onClick={handleReset} variant="secondary" />
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────

function App() {
  return (
    <div style={appStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <div>
          <div style={{ fontSize: "20px", fontWeight: "800", color: "#f1f5f9" }}>
            🧪 Testing Suite
          </div>
          <div style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>
            React Component Library
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
          <span style={badgeStyle}>Jest</span>
          <span style={{ ...badgeStyle, background: "linear-gradient(135deg, #0ea5e9, #06b6d4)" }}>RTL</span>
          <span style={{ ...badgeStyle, background: "linear-gradient(135deg, #10b981, #059669)" }}>70%+ Coverage</span>
        </div>
      </header>

      <main style={mainStyle}>

        {/* Button Section */}
        <section style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Button</h2>
          <p style={sectionSubStyle}>
            Three variants — primary, secondary, and danger. Supports disabled state.
          </p>
          <div style={rowStyle}>
            <Button label="Primary Action" variant="primary" onClick={() => alert("Primary clicked!")} />
            <Button label="Secondary" variant="secondary" onClick={() => alert("Secondary clicked!")} />
            <Button label="Danger" variant="danger" onClick={() => alert("Danger clicked!")} />
            <Button label="Disabled" variant="primary" disabled={true} />
          </div>
        </section>

        {/* Counter Section */}
        <section style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Counter</h2>
          <p style={sectionSubStyle}>
            Stateful counter with increment, decrement, reset, min/max boundaries and custom step.
          </p>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            <Counter initialValue={0} min={0} max={10} />
            <Counter initialValue={5} step={2} min={0} max={20} />
          </div>
        </section>

        {/* Form / Input Section */}
        <section style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Input & Form</h2>
          <p style={sectionSubStyle}>
            Controlled input with label, placeholder, validation errors, and disabled state.
          </p>
          <FormDemo />
        </section>

        {/* Posts Section */}
        <section style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>Posts</h2>
          <p style={sectionSubStyle}>
            Fetches from a remote API and handles loading, error, and empty states gracefully.
          </p>
          <Posts />
        </section>

      </main>
    </div>
  );
}

export default App;
