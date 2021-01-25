import { render, screen } from "@testing-library/react";
import Header from "./index";

fit("renders Header", () => {
  render(<Header />);
  const progressBar = screen.getByRole("progressbar");
  expect(progressBar).toBeTruthy();
});
