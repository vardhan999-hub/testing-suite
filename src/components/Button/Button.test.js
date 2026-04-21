// src/components/Button/Button.test.js
// ─────────────────────────────────────────────────────────────
//  Tests for the Button component
//  Covers: Level 1 (render, props) + Level 2 (interaction)
//
//  ✅ Uses getByRole("button", { name: /label/i }) throughout
//     — the RTL-recommended accessible selector, not getByTestId.
//     This tests the way real users and screen-readers experience
//     the component, not just internal implementation details.
// ─────────────────────────────────────────────────────────────

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

// ── Level 1: Render & Props ───────────────────────────────────

describe("Button – Render & Props (Level 1)", () => {
  test("renders without crashing", () => {
    render(<Button label="Click Me" />);
    // getByRole("button") finds a real <button> element — same way
    // a screen-reader would locate it.
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  test("displays the correct label passed via props", () => {
    render(<Button label="Submit" />);
    expect(screen.getByRole("button", { name: /submit/i })).toHaveTextContent("Submit");
  });

  test("renders as disabled when disabled prop is true", () => {
    render(<Button label="Save" disabled={true} />);
    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  });

  test("is NOT disabled by default", () => {
    render(<Button label="Save" />);
    expect(screen.getByRole("button", { name: /save/i })).not.toBeDisabled();
  });

  test("renders different label text correctly", () => {
    render(<Button label="Delete Account" variant="danger" />);
    expect(screen.getByRole("button", { name: /delete account/i })).toHaveTextContent("Delete Account");
  });
});

// ── Level 2: Interaction Testing ──────────────────────────────

describe("Button – Interaction (Level 2)", () => {
  test("calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button label="Click Me" onClick={handleClick} />);
    await user.click(screen.getByRole("button", { name: /click me/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does NOT call onClick when button is disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    // getByRole still finds the button even when disabled — and
    // userEvent correctly refuses to click a disabled element.
    render(<Button label="Disabled" onClick={handleClick} disabled={true} />);
    await user.click(screen.getByRole("button", { name: /disabled/i }));

    expect(handleClick).not.toHaveBeenCalled();
  });

  // ── Point D: explicit negative interaction (edge-case thinking) ──
  test("does not trigger click when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    // getByRole finds the button by its accessible name — no testId needed.
    // userEvent correctly refuses to fire a click on a disabled element.
    render(<Button label="Click" onClick={handleClick} disabled />);
    await user.click(screen.getByRole("button", { name: /click/i }));

    expect(handleClick).not.toHaveBeenCalled();
  });

  test("calls onClick multiple times when clicked multiple times", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button label="Like" onClick={handleClick} />);
    await user.click(screen.getByRole("button", { name: /like/i }));
    await user.click(screen.getByRole("button", { name: /like/i }));
    await user.click(screen.getByRole("button", { name: /like/i }));

    expect(handleClick).toHaveBeenCalledTimes(3);
  });
});
