import { render } from "../../custom-render";
import Home from ".";
import store from "../../redux";
import { setLoading, setError, setImages } from "../../redux/slices/catsSlice";

describe("Home", () => {
  it("renders Home with loading", () => {
    const { getByRole } = render(<Home />);
    store.dispatch(setLoading(true));
    expect(getByRole("progressbar")).toBeInTheDocument();
  });
  it("renders Home with error", () => {
    const { getByText } = render(<Home />);
    const errorMessage = "Some Error Occured";
    store.dispatch(setError(errorMessage));
    expect(getByText(errorMessage)).toBeInTheDocument();
  });
  it("renders Home with images", () => {
    const images = [{ id: "1", url: "someimageurl" }];
    const { getByLabelText, getByTestId, container } = render(<Home />);
    const data = {
      data: images,
      pagination_count: images.length,
    };
    store.dispatch(setImages(data));

    expect(getByLabelText("Page")).toBeInTheDocument();
    expect(getByTestId("page-select-label")).toHaveTextContent(1);

    expect(getByLabelText("Images")).toBeInTheDocument();
    expect(getByTestId("images-select-label")).toHaveTextContent(4);

    expect(getByLabelText("Order")).toBeInTheDocument();
    expect(getByTestId("order-select-label")).toHaveTextContent("Asc");

    expect(container.getElementsByClassName("MuiCardHeader-root").length).toBe(
      images.length
    );
  });
});
