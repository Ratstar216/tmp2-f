import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TweetList from './components/TweetList';
import TweetDetail from './components/TweetDetail';
import { fireAuth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import SignupForm from './SignupForm';
import SigninForm from './SigninForm';
import Signout from './SignOut';





const App: React.FC = () => {

  const [loginUser, setLoginUser] = useState(fireAuth.currentUser);
  const [userEmail, setUserEmail] = useState<any>(null);

  onAuthStateChanged(fireAuth, user => {
    setLoginUser(user);
    console.log(user);
    setUserEmail(user?.email);
    console.log(user?.email ?? "No email available");
  });

  // const [userEmail, setUserEmail] = useState<string | null>(null);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // ログイン状態を管理

  
  return (
    <div className="App">
    <header className="App-header">
     <p>Authentication</p>
    </header>
    <div className="Forms">
    <SignupForm />
    <SigninForm />
    <Signout />
    </div>
    User: {userEmail}
    {loginUser ? 
    <Router>
      <Routes>
        <Route path="/" element={<TweetList userEmail={userEmail}/>} />
        <Route path="/tweets/:id" element={<TweetDetail userEmail={userEmail}/>} />
      </Routes>
    </Router>
    : null}
    </div>
  );
};

export default App;