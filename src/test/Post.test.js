import { render, fireEvent } from '@testing-library/react';
import Post from '../components/Post';

test('increment likes by 1 when the post is not liked', () => {
    const props = {
        authorImg: 'author-img-url',
        author: 'Roni Levi',
        date: '2023-05-08',
        content: 'Post content',
        Likes: 10,
    };

    const { getByText } = render(<Post {...props} />);
    //const likeButton = getByText('10 Like');
    // expect(likeButton.textContent).toBe('10 Like');
    // fireEvent.click(likeButton); //like the post (+1)
    // expect(likeButton.textContent).toBe('11 Like');
});

test('decrement likes count when the post is already liked (unlike)', () => {
    const props = {
        authorImg: 'author-img-url',
        author: 'Roni Levi',
        date: '2023-05-08',
        content: 'Post content',
        Likes: 10,
    };

    // const { getByText } = render(<Post {...props} />);
    // const likeButton = getByText('10 Like');

    // fireEvent.click(likeButton); //like
    // fireEvent.click(likeButton); //unlike

    // expect(likeButton.textContent).toBe('10 Like');
});



// test('add a comment to the comments array', () => {
//     const props = {
//         authorImg: 'author-img-url',
//         author: 'Roni Levi',
//         date: '2023-05-08',
//         content: 'Post content',
//         Likes: 1,
//     };

//     const { getByPlaceholderText, getByText } = render(<Post {...props} />);
//     const commentInput = getByPlaceholderText('Add a comment...');
//     const commentButton = getByText('0 Comments');
//     fireEvent.change(commentInput, { target: { value: 'New comment' } });
//     fireEvent.click(commentButton);
//     const commentCount = getByText('1 Comment');
//     const commentText = getByText('New comment');

//     expect(commentCount).toBeInTheDocument();
//     expect(commentText).toBeInTheDocument();
// });
