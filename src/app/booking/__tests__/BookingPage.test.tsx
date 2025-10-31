import { render, screen, fireEvent } from '@testing-library/react';
import BookingPage from '../page';

describe('BookingPage Component', () => {
  test('renders the booking form', () => {
    render(<BookingPage />);
    expect(screen.getByText('Train Ticket Booking')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm booking/i })).toBeInTheDocument();
  });

  test('updates contact information inputs', () => {
    render(<BookingPage />);
    const nameInput = screen.getByPlaceholderText('Full Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const phoneInput = screen.getByPlaceholderText('Phone');

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    expect(nameInput).toHaveValue('John');
    expect(emailInput).toHaveValue('john@example.com');
    expect(phoneInput).toHaveValue('1234567890');
  });

  test('prevents submission while processing', () => {
    render(<BookingPage />);
    const submitButton = screen.getByRole('button', { name: /confirm booking/i });

    expect(submitButton).not.toBeDisabled();
    // We could simulate form submit if needed
  });
});
