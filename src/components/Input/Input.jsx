// src/components/Input/Input.jsx
// ─────────────────────────────────────────────────────────────
//  Reusable controlled Input component
//  Props:
//    label       – label text shown above the field
//    value       – current value (controlled)
//    onChange    – change handler
//    placeholder – placeholder text
//    error       – error message string (shown below input in red)
//    type        – input type (default: "text")
//    disabled    – boolean
// ─────────────────────────────────────────────────────────────

import React from "react";

const wrapperStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  marginBottom: "12px",
  fontFamily: "inherit",
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#374151",
};

const inputBase = {
  padding: "10px 12px",
  borderRadius: "6px",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
  width: "100%",
  boxSizing: "border-box",
};

const errorStyle = {
  fontSize: "12px",
  color: "#dc2626",
  marginTop: "2px",
};

function Input({
  label,
  value,
  onChange,
  placeholder = "",
  error = "",
  type = "text",
  disabled = false,
}) {
  const border = error ? "2px solid #dc2626" : "2px solid #d1d5db";
  const focusBorder = error ? "#dc2626" : "#2563eb";

  return (
    <div style={wrapperStyle}>
      {label && (
        <label style={labelStyle} data-testid="input-label">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{ ...inputBase, border }}
        data-testid="input-field"
        aria-invalid={!!error}
        aria-describedby={error ? "input-error" : undefined}
        onFocus={(e) => (e.target.style.border = `2px solid ${focusBorder}`)}
        onBlur={(e) => (e.target.style.border = border)}
      />
      {error && (
        <span id="input-error" style={errorStyle} data-testid="input-error">
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;
