import { render, screen, cleanup } from "@testing-library/react";
import Menu from "./Menu";

afterEach(cleanup);

describe('Menu', () => {
  it('has an "Edit Countries" button', () => {
    render(<Menu setMenu={false} userCountry={false} idx={{idx: {AD: {M: 0, N: 0, Nu: 0, P: 0, global: 0}}}} setClicked={{ name: 'world', 'Alpha-2': 'world' }} />)
    const buttonElement = screen.getByText(/Edit Countries/);
    expect(buttonElement).toBeInTheDocument();
  });
})  