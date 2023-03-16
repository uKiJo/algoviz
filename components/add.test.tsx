import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Add from './add';

test('add two numbers', () => {
  render(<Add />);
  const button = screen.getByText('update');

  expect(button).toHaveTextContent('update');
});
