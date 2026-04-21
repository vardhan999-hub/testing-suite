
import React from "react";

const variantStyles = {
  primary:   { background: "#2563eb", color: "#fff",    border: "none" },
  secondary: { background: "#e5e7eb", color: "#111827", border: "none" },
  danger:    { background: "#dc2626", color: "#fff",    border: "none" }
};

const baseStyle = {
  padding: "10px 20px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "opacity 0.2s",
  fontFamily: "inherit"
};

function Button({ label, onClick, variant = "primary", disabled = false }) {
  const style = {
    ...baseStyle,
    ...(variantStyles[variant] || variantStyles.primary),
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "pointer"
  };

  return (
    <button
      style={style}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      data-testid="button"
    >
      {label}
    </button>
  );
}

export default Button;
