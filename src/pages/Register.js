import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../api/auth";
import { setToken } from "../utils/local-store";

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [replacePassword, setReplacePassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async() => {
    setError('');
    if (!email || !password || !replacePassword) {
      setError('Please enter email and password');
      return;
    }
    if (password !== replacePassword) {
      setError('Password and confirm password do not match');
      return;
    }
    setLoading(true);
    const res = await register({ email, password });
    if (res.token) {
      setToken(res.token);
      window.location.href = '/broads';
    } else {
      setError(res.message);
    }
    setLoading(false);
  }

  return (
    <div className="login-page relative">
      <Link className="login-logo flex items-center gap-4" to={'/'}>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.656 1.343 3 3 3h18c1.656 0 3-1.344 3-3V3c0-1.657-1.344-3-3-3zM10.44 18.18c0 .795-.645 1.44-1.44 1.44H4.56c-.795 0-1.44-.646-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44H9c.795 0 1.44.645 1.44 1.44v13.62zm10.44-6c0 .794-.645 1.44-1.44 1.44H15c-.795 0-1.44-.646-1.44-1.44V4.56c0-.795.646-1.44 1.44-1.44h4.44c.795 0 1.44.645 1.44 1.44v7.62z"></path></svg>
        Trello clone
      </Link>
      <div className="login-container">
        <div className="login-title">Sign up for your account</div>
        <div className="login-input">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-input">
          <input
            type="password"
            placeholder="Confirm password"
            value={replacePassword}
            onChange={(e) => setReplacePassword(e.target.value)}
          />
        </div>
        <div className="login-btn">
          <button onClick={handleLogin}>Sign up</button>
        </div>
        {error && <div className="login-error">{error}</div>}
        <Link to={'/login'}>Already have an account? Log in.</Link>
      </div>
      <img className="absolute w-[20%] bottom-[20px] left-[20px]" src="https://trello-clone-one.vercel.app/signup/sign-up-left.svg" alt="" />
      <img className="absolute w-[20%] bottom-[20px] right-[20px]" src="https://trello-clone-one.vercel.app/signup/sign-up-right.svg" alt="" />
    </div>
  );
}

export default Register;