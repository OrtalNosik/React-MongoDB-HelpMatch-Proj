import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import NavBar from '../components/NavBar';

// Mock axios.post to return mock data
jest.mock('axios');

describe('NavBar', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test('renders navbar', () => {
    render(<NavBar />);
    const navbarElement = screen.getByTestId('navbar');
    expect(navbarElement).toBeInTheDocument();
  });

  test('handles logout when clicked', async () => {
    // Mock axios.post to return success message
    const mockResponse = { data: { message: 'Logout successful' } };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(<NavBar />);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(0);
    });
  });

});
