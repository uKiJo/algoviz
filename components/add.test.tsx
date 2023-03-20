import { screen, render } from '@testing-library/react';
// import '@testing-library/jest-dom';
import Add from '@components/add';

test('add two numbers', () => {
  const { container } = render(<Add />);
  const button = screen.getByText('update');
  expect(container.firstChild).toHaveTextContent('update');
  // expect(button).toHaveTextContent('update');
});
