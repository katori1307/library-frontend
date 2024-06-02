import Home from '../page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Homepage', () => {
  it('Render homepage correctly', () => {
    render(<Home />);
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
  });
});
