import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Lawyer from '../components/Lawyer';

describe('Lawyer component', () => {
  test('renders Lawyer component', () => {
    render(<Lawyer />);
  });


  test('filters lawyers based on search input', async () => {
    render(<Lawyer />);
    await waitFor(() => {
      const lawyerRows = screen.getAllByRole('row');
    });
  });


});