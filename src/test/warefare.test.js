import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Werefare from '../components/Werefare';

describe('Werefare component', () => {
  test('renders Werefare component', () => {
    render(<Werefare />);
  });


  test('filters data based on search input', async () => {
    render(<Werefare />);
    await waitFor(() => {
      const filteredDataRows = screen.getAllByRole('row');
    });
  });
});