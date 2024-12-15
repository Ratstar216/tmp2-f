import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tweet from './Tweet';
import TweetForm from './TweetForm';

// interface TweetProps {
//   id: number;
//   user_id: number;
//   content: string;
//   created_at: string;
// }

interface TweetProps {
  id: string;
  user_id: string;
  parent_id: string;
  username: string;
  likes: number;
  content: string;
  created_at: string;
}

interface Props { // Props インターフェースを定義
  userEmail: string | null;
}


const TweetList: React.FC<Props> = ({userEmail}) => {
  const [tweets, setTweets] = useState<TweetProps[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch('https://tmp2-b-375247885230.us-central1.run.app/tweets'); // Assuming your API is on the same domain
        const data = await response.json() as TweetProps[];
        setTweets(data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchTweets();
    console.log(tweets);
  }, []);

  const handleTweetCreated = (newTweet: TweetProps) => {
    setTweets([newTweet, ...tweets]);
  };

  return (
    <div>
      <h2>Tweets</h2>
      <TweetForm onTweetCreated={handleTweetCreated} userEmail={userEmail} />
      <ul>
        {tweets.filter((tweet) => tweet.parent_id == "").map((tweet) => (
          <li key={tweet.id}>
            {/* <Link to={`/tweets/${tweet.id}`}>
              <Tweet tweet={tweet} />
            </Link> */}
            <Tweet tweet={tweet} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TweetList;