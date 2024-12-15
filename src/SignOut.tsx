import { signOut } from "firebase/auth";
import { fireAuth } from "./firebase";

export const SignOut: React.FC = () => {
  /**
   * ログアウトする
   */
  const signOutWithEmail = async () => {
    try {
      await signOut(fireAuth);
      alert('ログアウトしました');
    } catch (error) {
      alert('ログアウトエラー:' + error);
    }
  };

  return (
    <div>
      <button onClick={signOutWithEmail}>
        Log out
      </button>
    </div>
  );
};

export default SignOut;
