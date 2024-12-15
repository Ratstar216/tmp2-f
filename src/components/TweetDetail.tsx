import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Tweet from './Tweet';
import ReplyForm from './ReplyForm';

// interface TweetProps {
//   id: number;
//   user_id: number;
//   content: string;
//   created_at: string;
//   replies?: Tweet[]; // Replies are optional
// }

interface TweetProps {
  id: string;
  user_id: string;
  parent_id: string;
  username: string;
  likes: number;
  content: string;
  created_at: string;
  // replies?: TweetProps[]; // Replies are optional
}

interface Props { // Props インターフェースを定義
  userEmail: string | null;
}

const TweetDetail: React.FC<Props> = ({userEmail}) => {
  // const { id } = useParams<{ id: string }>() ?? { id: '' };
  let  { id } = useParams<{ id: string }>();
  id = id ?? '';
  // const [tweet, setTweet] = useState<TweetProps | null>(null);
  const [tweets, setTweets] = useState<TweetProps[]>([]);


  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const response = await fetch(`https://tmp2-b-375247885230.us-central1.run.app/tweets/${id}`);
        const data = await response.json() as TweetProps[];
        setTweets(data);
        console.log("success");
        console.log(data);
      } catch (error) {
        console.error('Error fetching tweet:', error);
      }
    };

    const fetchTweet2 = async () => {
      try {
        const response = await fetch(`https://tmp2-b-375247885230.us-central1.run.app/tweets`);
        const data = await response.json() as TweetProps[];
        setTweets(data);
        console.log("success");
        console.log(data);
      } catch (error) {
        console.error('Error fetching tweet:', error);
      }
    };

    fetchTweet2();
  }, [id]);

  // const handleReplyCreated = (newReply: TweetProps) => {
  //   if (tweet) {
  //     setTweet({
  //       ...tweet,
  //       replies: tweet.replies ? [...tweet.replies, newReply] : [newReply],
  //     });
  //   }
  // };

  // if (!tweet) {
  //   return <div>Loading...</div>;
  // }

  console.log(tweets);
  // console.log(tweets[0].content);

  return (
    <div>
      {tweets.filter((tweet) => tweet.id === id).map((tweet) => (
        <Tweet tweet={tweet} />
      ))}
      {/* <Tweet tweet={tweets} /> */}
      {/* {tweet && <p>{tweet.content}</p>}
      {tweet && tweet.id} */}
      {/* <ReplyForm parentTweetId={id} onReplyCreated={handleReplyCreated} /> */}
      <ReplyForm parentTweetId={id} userEmail={userEmail}/>
      <h3>Replies</h3>
      <ul>
        {/* {tweet.replies &&
          tweet.replies.map((reply) => (
            <li key={reply.id}>
              <Tweet tweet={reply} />
            </li>
          ))} */}

        {tweets.filter((tweet) => tweet.parent_id == id).map((reply) => (
            <li key={reply.id}>
              <Tweet tweet={reply} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TweetDetail;