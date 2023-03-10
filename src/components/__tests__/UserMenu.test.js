import renderer from "react-test-renderer";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  getByLabelText,
} from "@testing-library/react";

import UserMenu from "../UserMenu";

afterEach(cleanup);
