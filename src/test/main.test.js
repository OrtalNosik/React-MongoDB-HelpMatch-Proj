import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Main from '../components/Main';

// Mock axios.get to return mock data
jest.mock('axios');

describe('Main', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  test('renders title with motivation sentence', async () => {
    const mockSentence = 'ברכות לך על העצמתך והתמדתך לעקוב אחרי חלומותיך!';
    render(<Main isLoggedIn={true} img="user.jpg" name="John Doe" email="john@example.com" />);

    await waitFor(() => {
      expect(screen.getByText(mockSentence)).toBeInTheDocument();
    });
  });

  test('renders posts when logged in', async () => {
    // Mock axios.get to return posts
    const mockPosts = [
      {
        _id: '1',
        author: 'John Doe',
        date: '2023-05-26',
        content: 'This is a post.',
        authorImg: 'author.jpg',
        likes: 10,
        theme: 'Home',
      },
      {
        _id: '2',
        author: 'Jane Smith',
        date: '2023-05-27',
        content: 'This is another post.',
        authorImg: 'author2.jpg',
        likes: 5,
        theme: 'Family',
      },
    ];
    axios.get.mockResolvedValueOnce({ data: mockPosts });

    render(<Main isLoggedIn={true} img="user.jpg" name="John Doe" email="john@example.com" />);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3200/post');
  });

  test('does not render posts when not logged in', async () => {
    render(<Main isLoggedIn={false} img="user.jpg" name="John Doe" email="john@example.com" />);

    await waitFor(() => {
      expect(screen.queryByText('This is a post.')).toBeNull();
      expect(screen.queryByText('This is another post.')).toBeNull();
    });

   
  });
});
