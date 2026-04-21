

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";



describe("Button – Render & Props (Level 1)", () => {
  test("renders without crashing", () => {
    render(<Button label="Click Me" />);
    
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

    
    render(<Button label="Disabled" onClick={handleClick} disabled={true} />);
    await user.click(screen.getByRole("button", { name: /disabled/i }));

    expect(handleClick).not.toHaveBeenCalled();
  });

 
  test("does not trigger click when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

   
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
