import {render, getByTestId, getByRole, cleanup} from '@testing-library/react';
import HappyIndex from './happyIndex';

afterEach(cleanup);

describe("HappyIndex", () => {
  it("should display an index next to 'World Happiness'", () => {
    render(<HappyIndex/>);
    const titleElement = getByTestId('index');
    expect(titleElement).toHaveTextContent('World Happiness');
  });

  it("should display a number corresponding to the world happiness", () => {
    render(<HappyIndex/>);
    const happinessElement = getByTestId('idxValue');
    expect(typeof parseInt(happinessElement.innerHTML)).toBe('number');
  });

  it("should have an index for yesterday", () => {
    render(<HappyIndex/>);
    const yesterdayElement = getByText('Yesterday');
    expect(yesterdayElement).toBeInTheDocument();
  })
})