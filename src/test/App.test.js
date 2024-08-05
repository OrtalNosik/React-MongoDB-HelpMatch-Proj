import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import SignUp from '../components/SignUp'
import Login from '../components/Login'

describe('App', () => {
  test('renders navbar', () => {
    render(<App />);
    const navbar = screen.getByTestId('navbar');
    expect(navbar).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<App />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});

describe('SignUp', () => {
  test('renders signup form', () => {
    render(<Login onClose={() => { }} />);
    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const submitButton = screen.getByText('אישור');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  test('submits the form when all fields are filled in', async () => {
    const mockFetch = jest.fn(() => Promise.resolve({ success: true, message: 'User registered successfully' }));
    global.fetch = mockFetch;

    render(<SignUp />);

    const firstNameInput = screen.getByPlaceholderText('First name');
    const lastNameInput = screen.getByPlaceholderText('Last name');
    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const submitButton = screen.getByRole('button', { name: 'הרשם' });

    fireEvent.change(firstNameInput, { target: { value: 'Dani' } });
    fireEvent.change(lastNameInput, { target: { value: 'Levi' } });
    fireEvent.change(emailInput, { target: { value: 'danilevi@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);

    expect(requestBody.fname).toBe('Dani');
    expect(requestBody.lname).toBe('Levi');
    expect(requestBody.email).toBe('danilevi@example.com');
    expect(requestBody.password).toBe('password123');
  });
});

describe('Login', () => {
  test('renders the login form', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    const emailLabel = getByText('כתובת אימייל');
    const passwordLabel = getByText('סיסמא');
    const emailInput = getByPlaceholderText('Enter email');
    const passwordInput = getByPlaceholderText('Enter password');
    const submitButton = getByText('אישור');
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});

describe('Forms', () => {
  test('renders form', () => {
    render(<Login onClose={() => { }} />);
    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const submitButton = screen.getByText('אישור');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('calls API on form submission', async () => {
    const mockOnClose = jest.fn();
    const fakeResponse = { message: 'Success' };
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(fakeResponse),
      });
    });

    render(<Login onClose={mockOnClose} />);
    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const submitButton = screen.getByText('אישור');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith('http://localhost:3200/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@test.com', password: 'password' }),
      });
    });

    window.fetch.mockClear();
  });
});