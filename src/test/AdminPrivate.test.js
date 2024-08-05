import React from 'react';
import AdminPrivate from '../components/AdminPrivate';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { screen } from '@testing-library/react';

jest.mock('axios');

describe('AdminPrivate', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock function calls after each test
    });

    test('renders component without errors', () => {
        render(<AdminPrivate />);
        const pageTitle = screen.getByText('כל המשתמשים באתר');
        expect(pageTitle).toBeInTheDocument();

    });
      


});
