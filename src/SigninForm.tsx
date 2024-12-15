import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "./firebase";

export const SigninForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(fireAuth, email, password);
      alert("ログインが完了しました");
    } catch (error: any) {
      alert("エラー:" + error.message);
    }
  };

  return (
    <form id="signin-form" onSubmit={signInWithEmail}>
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
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SigninForm;
