// import { render, screen } from '@testing-library/react';
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter} from "react-router-dom";

import Navbar from "./Navbar";

afterEach(cleanup);

describe("Navbar", () => {
  it("loads and displays text", () => {
    render(<Navbar />, { wrapper: BrowserRouter });
    const headingElement = screen.getByText(/How's The World/);
    expect(headingElement).toBeInTheDocument();
  });
});
