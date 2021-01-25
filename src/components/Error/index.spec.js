import { render } from "@testing-library/react";
import Error from "./index";

const props = {
  errorMessage: "I am a error",
};

it("renders error message", () => {
  const { getByText } = render(<Error {...props} />);
  getByText(props.errorMessage);
});
