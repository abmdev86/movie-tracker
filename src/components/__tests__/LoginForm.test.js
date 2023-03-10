import renderer from "react-test-renderer";
import { render, screen, cleanup } from "@testing-library/react";

import LoginForm from "../LoginForm";

afterEach(cleanup);

it("renders correctly with label, inputs and button", () => {
  const loginFormComponent = renderer.create(<LoginForm />);
  let tree = loginFormComponent.toJSON();
  expect(tree).toMatchSnapshot();
  expect(screen.getByLabelText("Login Form")).toBeVisible();
});
