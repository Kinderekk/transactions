import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Filter from './Filter';

test('typing inside filter input', () => {
  render(<Filter onChange={(text) => {
    expect(text).toHaveValue('all');
  }} />);
  const input = screen.getByTestId('filter-input');
  userEvent.type(input, 'all');
});
