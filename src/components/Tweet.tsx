import React, { useState } from 'react';


interface TweetProps {
  id: string;
  user_id: string;
  parent_id: string;
  username: string;
  likes: number;
  content: string;
  created_at: string;
}

interface Props {
  tweet: TweetProps;
}

const handleLike = async (id: string) => {

  // const [liked, setLiked] = useState(false); // 「いいね」の状態を管理
  // const [likeCount, setLikeCount] = useState(tweet.likes); // いいね数を管理


  try {
    const response = await fetch(`http://localhost:8080/tweets/${id}/like`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // if (response.ok) {
    //   setLiked(!liked); // 「いいね」の状態を反転
    //   setLikeCount(liked ? likeCount - 1 : likeCount + 1); // いいね数を更新
    // } else {
    //   console.error('Error liking/unliking tweet:', response.statusText);
    // }
  } catch (error) {
    console.error('Error liking tweet:', error);
  }
};

const Tweet: React.FC<Props> = ({ tweet }) => {
  // console.log("tweet component", tweet);
  return (
    <div>
      <p>{tweet.content}</p>
      <small>
        Posted by user {tweet.user_id} on{' '}
        {/* {new Date(tweet.created_at).toLocaleString()} */}
        {tweet.created_at}
      </small>
      <button onClick={() => handleLike(tweet.id)}>
        {'Like'} {tweet.likes}
      </button>
    </div>
  );
};

export default Tweet;