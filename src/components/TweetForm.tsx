import React, { useState } from 'react';

// interface Props {
//   onTweetCreated: (newTweet: {
//     id: number;
//     user_id: number;
//     content: string;
//     created_at: string;
//   }) => void;
// }

interface Props {
  userEmail: string | null;
  onTweetCreated: (newTweet: {
    id: string;
    user_id: string;
    parent_id: string;
    username: string;
    likes: number;
    content: string;
    created_at: string;
  }) => void;
}



const TweetForm: React.FC<Props> = ({ onTweetCreated, userEmail }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content:content, username: userEmail, user_id: userEmail }),
      });
      const newTweet = await response.json();
      onTweetCreated(newTweet);
      setContent('');
    } catch (error) {
      console.error('Error creating tweet:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
      />
      <button type="submit">Tweet</button>
    </form>
  );
};

export default TweetForm;