import renderer from "react-test-renderer";
import { render, screen, cleanup } from "@testing-library/react";

import Header from "../Header";

afterEach(cleanup);
it("component has container and children", () => {
  const headerComponent = renderer.create(<Header />);
  let tree = headerComponent.toJSON();
  expect(tree).toMatchSnapshot();
});

test("it renders Movie Tracker", () => {
  render(<Header pages={["one", "two", "three"]} />);
  const headerElement = screen.getByText("Movie Tracker");

  expect(headerElement).toBeInTheDocument();
});
