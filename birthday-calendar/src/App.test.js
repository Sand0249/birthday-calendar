import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

test('renders march 27 by default', () => {
  render(<App />);
  const heading = screen.getByText('Birthdays on Mon Mar 27 2023');
  expect(heading).toBeInTheDocument();
});

test('renders adding favorites btn', () => {
  const { getByTestId } = render(<App />);
  const favBtn = getByTestId('add-fav-btn');
  expect(favBtn).toBeInTheDocument();
});

test('renders search bar', () => {
  const { getByTestId } = render(<App />);
  const search = getByTestId('searchbar');
  expect(search).toBeInTheDocument();
});

test('renders dialog on button click', () => {
  const { getByTestId } = render(<App />);
  const favBtn = getByTestId('add-fav-btn');
  fireEvent.click(favBtn);
  const favDialog = getByTestId('fav-dialog');
  expect(favDialog).toBeInTheDocument();
});
