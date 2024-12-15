import React, { useState } from 'react';

// interface Props {
//   parentTweetId: number;
//   onReplyCreated: (newReply: {
//     id: number;
//     user_id: number;
//     content: string;
//     created_at: string;
//     parent_id: number;
//   }) => void;
// }

interface Props {
  parentTweetId: string;
  userEmail: string | null;
  onReplyCreated: (newReply: {
    id: string;
    user_id: string;
    parent_id: string;
    username: string;
    likes: number;
    content: string;
    created_at: string;
  }) => void;
}


const ReplyForm: React.FC<any> = ({ parentTweetId, userEmail}) => {
  const [content, setContent] = useState('');

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch(`http://localhost:8080/tweets/${parentTweetId}/reply`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ content }),
  //     });
  //     const newReply = await response.json();
  //     onReplyCreated(newReply);
  //     setContent('');
  //   } catch (error) {
  //     console.error('Error replying to tweet:', error);
  //   }
  // };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content:content, parent_id: parentTweetId, username: userEmail, user_id: userEmail }),
      });
      const newTweet = await response.json();
      // onTweetCreated(newTweet);
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
        placeholder="Reply to tweet..."
      />
      <button type="submit">Reply</button>
    </form>
  );
};

export default ReplyForm;