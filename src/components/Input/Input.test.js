import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Input from "./Input";


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



describe("Input – Render & Props (Level 1)", () => {
  test("renders without crashing", () => {
    render(<Input value="" onChange={() => {}} />);
    
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders the label text correctly", () => {
    render(<Input label="Email Address" value="" onChange={() => {}} />);
  
    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });

  test("renders placeholder text", () => {
    render(<Input placeholder="Enter your name" value="" onChange={() => {}} />);
    
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "Enter your name"
    );
  });

  test("displays error message when error prop is provided", () => {
    render(
      <Input value="" onChange={() => {}} error="This field is required" />
    );
    
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
