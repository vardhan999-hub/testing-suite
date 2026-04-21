// src/components/Input/Input.test.js
// ─────────────────────────────────────────────────────────────
//  Tests for the Input component
//  Covers: Level 1 (render, props) + Level 2 (user typing interaction)
//
//  ✅ Uses getByRole("textbox") for the <input> element — the
//     accessible selector RTL recommends. The label and error span
//     have no semantic ARIA role so getByText / getByTestId are
//     appropriate there.
// ─────────────────────────────────────────────────────────────

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Input from "./Input";

// ── Helper: wraps Input with local state so we can test typing ─
function ControlledInput(props) {
  const [val, setVal] = useState(props.value || "");
  return (
    <Input
      {...props}
      value={val}
      onChange={(e) => setVal(e.target.value)}
    />
  );
}

// ── Level 1: Render & Props ───────────────────────────────────

describe("Input – Render & Props (Level 1)", () => {
  test("renders without crashing", () => {
    render(<Input value="" onChange={() => {}} />);
    // getByRole("textbox") is the accessible way to find a text input
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders the label text correctly", () => {
    render(<Input label="Email Address" value="" onChange={() => {}} />);
    // getByText finds the visible label — same as a sighted user reads it
    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });

  test("renders placeholder text", () => {
    render(<Input placeholder="Enter your name" value="" onChange={() => {}} />);
    // placeholder is an attribute on the element, verified via role selector
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "Enter your name"
    );
  });

  test("displays error message when error prop is provided", () => {
    render(
      <Input value="" onChange={() => {}} error="This field is required" />
    );
    // Error message is visible text — getByText is the right query
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  test("does NOT render error element when no error prop", () => {
    render(<Input value="" onChange={() => {}} />);
    expect(screen.queryByTestId("input-error")).not.toBeInTheDocument();
  });

  test("is disabled when disabled prop is true", () => {
    render(<Input value="" onChange={() => {}} disabled={true} />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  test("sets aria-invalid when error is present", () => {
    render(<Input value="" onChange={() => {}} error="Bad value" />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });
});

// ── Level 2: Interaction – user typing ────────────────────────

describe("Input – Interaction (Level 2)", () => {
  test("value updates as user types", async () => {
    const user = userEvent.setup();
    render(<ControlledInput label="Name" />);

    const field = screen.getByRole("textbox");
    await user.type(field, "Alice");

    expect(field).toHaveValue("Alice");
  });

  test("calls onChange handler on each keystroke", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Input value="" onChange={handleChange} />);
    const field = screen.getByRole("textbox");

    await user.type(field, "Hi");
    // "H" and "i" = 2 keystrokes → onChange called twice
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  test("clears field correctly", async () => {
    const user = userEvent.setup();
    render(<ControlledInput value="" />);

    const field = screen.getByRole("textbox");
    await user.type(field, "temp");
    expect(field).toHaveValue("temp");

    await user.clear(field);
    expect(field).toHaveValue("");
  });

  test("disabled input cannot be typed into", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Input value="" onChange={handleChange} disabled={true} />);
    const field = screen.getByRole("textbox");

    await user.type(field, "test");
    expect(handleChange).not.toHaveBeenCalled();
  });
});
