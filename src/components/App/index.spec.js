import React from "react";
import { render } from "../../custom-render";
import App from ".";

it("renders App", () => {
  const { getByLabelText, getByText, getByRole } = render(<App />);
  expect(getByLabelText("Home")).toBeInTheDocument();
  expect(getByText("Upload")).toBeInTheDocument();

  const homeBtn = getByRole("button", { name: /home/i });
  expect(homeBtn.href).toBe("http://localhost/");

  const uploadBtn = getByRole("button", { name: /upload/i });
  expect(uploadBtn.href).toBe("http://localhost/upload");

  expect(getByText("No images have been uploaded")).toBeInTheDocument();
});
