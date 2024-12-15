import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "./firebase";
// import "./SignupForm.css";

export const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(fireAuth, email, password);
      alert("ユーザー登録が完了しました");
    } catch (error: any) {
      alert("エラー:" + error.message);
    }
  };
  

  return (
    <form id="signup-form" onSubmit={signUpWithEmail}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
