// src/components/Counter/Counter.test.js
// ─────────────────────────────────────────────────────────────
//  Tests for the Counter component
//  Covers: Level 1 (render) + Level 2 (click interactions, state changes)
//
//  ✅ 100% accessibility-first selectors — zero getByTestId:
//     • Buttons  → getByRole("button", { name: /increment|decrement|reset/i })
//     • Value    → getByRole("status")  (aria-live="polite" region)
//     • Wrapper  → getByRole("group",  { name: /counter/i })
// ─────────────────────────────────────────────────────────────

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

// ── Level 1: Render & Props ───────────────────────────────────

describe("Counter – Render & Props (Level 1)", () => {
  test("renders without crashing", () => {
    render(<Counter />);
    // group role wraps the whole counter widget — accessible to AT users
    expect(screen.getByRole("group", { name: /counter/i })).toBeInTheDocument();
  });

  test("displays the initial value of 0 by default", () => {
    render(<Counter />);
    // status role = aria-live region — screen readers announce value changes
    expect(screen.getByRole("status")).toHaveTextContent("0");
  });

  test("displays a custom initialValue when passed via props", () => {
    render(<Counter initialValue={5} />);
    expect(screen.getByRole("status")).toHaveTextContent("5");
  });

  test("renders increment, decrement, and reset buttons", () => {
    render(<Counter />);
    expect(screen.getByRole("button", { name: /increment/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /decrement/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  test("decrement button is disabled at minimum value (0)", () => {
    render(<Counter initialValue={0} min={0} />);
    expect(screen.getByRole("button", { name: /decrement/i })).toBeDisabled();
  });

  test("increment button is disabled at maximum value (10)", () => {
    render(<Counter initialValue={10} max={10} />);
    expect(screen.getByRole("button", { name: /increment/i })).toBeDisabled();
  });
});

// ── Level 2: Interaction – button clicks change state ─────────

describe("Counter – Interaction (Level 2)", () => {
  test("clicking Increment changes count from 0 to 1", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} />);

    await user.click(screen.getByRole("button", { name: /increment/i }));

    expect(screen.getByRole("status")).toHaveTextContent("1");
  });

  test("clicking Increment multiple times increments correctly", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} max={10} />);

    const incrementBtn = screen.getByRole("button", { name: /increment/i });
    await user.click(incrementBtn);
    await user.click(incrementBtn);
    await user.click(incrementBtn);

    expect(screen.getByRole("status")).toHaveTextContent("3");
  });

  test("clicking Decrement decreases the count", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={5} />);

    await user.click(screen.getByRole("button", { name: /decrement/i }));

    expect(screen.getByRole("status")).toHaveTextContent("4");
  });

  test("clicking Reset returns count to initialValue", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={3} />);

    const incrementBtn = screen.getByRole("button", { name: /increment/i });
    await user.click(incrementBtn);
    await user.click(incrementBtn);
    expect(screen.getByRole("status")).toHaveTextContent("5");

    await user.click(screen.getByRole("button", { name: /reset/i }));
    expect(screen.getByRole("status")).toHaveTextContent("3");
  });

  test("count does NOT exceed max value when increment is clicked at max", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={9} max={10} />);

    const incrementBtn = screen.getByRole("button", { name: /increment/i });
    await user.click(incrementBtn); // → 10
    await user.click(incrementBtn); // stays at 10 — button goes disabled

    expect(screen.getByRole("status")).toHaveTextContent("10");
    expect(screen.getByRole("button", { name: /increment/i })).toBeDisabled();
  });

  test("count does NOT go below min value when decrement is clicked at min", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={1} min={0} />);

    await user.click(screen.getByRole("button", { name: /decrement/i })); // → 0

    expect(screen.getByRole("status")).toHaveTextContent("0");
    expect(screen.getByRole("button", { name: /decrement/i })).toBeDisabled();
  });

  test("uses custom step value", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} step={5} max={100} />);

    await user.click(screen.getByRole("button", { name: /increment/i }));

    expect(screen.getByRole("status")).toHaveTextContent("5");
  });
});
