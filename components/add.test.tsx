import { screen, render } from "@testing-library/react";
import Add from "./add";

test("add two numbers", () => {
  const { container } = render(<Add />);
  const button = screen.getByText("update");
  expect(container.firstChild).toHaveTextContent("update");
});
