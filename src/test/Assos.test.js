import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Associations from '../components/Associations';

describe('Associations', () => {
  test('renders the component with the correct title', async () => {
    render(<Associations />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'עמותות' })).toBeInTheDocument();
    });
  });


  test('renders the associations data', async () => {
    render(<Associations />);

    await waitFor(() => {
      const associationNames = screen.getAllByText(/שם עמותה:/i).map(node => node.nextSibling.textContent);
      expect(associationNames).toHaveLength(120);
    });
  });

});