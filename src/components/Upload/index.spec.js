import { render } from "../../custom-render";
import Upload from ".";
import store from "../../redux";
import { setLoading, setError } from "../../redux/slices/catsSlice";

describe("Upload", () => {
  it("renders Upload with loading", () => {
    const { getByRole } = render(<Upload />);
    store.dispatch(setLoading(true));
    expect(getByRole("progressbar")).toBeInTheDocument();
  });
  it("renders Upload with error", () => {
    const { getByText } = render(<Upload />);
    const errorMessage = "Some Error Occured";
    store.dispatch(setError(errorMessage));
    expect(getByText(errorMessage)).toBeInTheDocument();
  });
});
