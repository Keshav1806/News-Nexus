import React, { useState } from 'react';
import { app } from "../firebase";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

const auth = getAuth(app);
const googleprovider = new GoogleAuthProvider();

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState(null);
  const navigate= useNavigate();

  const createUser = async () => {
    setError(null);
    try {
        if (email === "" || password === "") {
            setError("Email and password must not be empty");
            return;
        }
        await createUserWithEmailAndPassword(auth, email, password).then((value) => alert("successfull sign up"));
        navigate('/');
        setEmail("");
        setPassword("");
        setUser("");
    } catch (error) {
        setError(error.message);
    }
};

  const signupwithgoogle = async() => {
    try {
        await signInWithPopup(auth, googleprovider);
        navigate('/');
      } catch (error) {
        console.error("Error during Google sign-in:", error);
      }
  }


  return (
    <>
      <div className="signup">
        <div className="logsign">
          <h1>Sign Up</h1>

          <div className="epass">
            <input
              type="text"
              id='username'
              name='username'
              required
              value={user} 
              onChange={(e) => setUser(e.target.value)}/>
            <label htmlFor="username">Username</label>
          </div>
          <div className="epass">
            <input
              type="text"
              id='signin-email1'
              name='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="signin-email1">Email</label>
          </div>
          <div className="epass">
            <input
              type="password"
              id='signin-password1'
              name='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="signin-password1">Password</label>
          </div>
          <div className={error? "error":"noerror"}>{error}</div>
          <Link to='#'>Forgot password?</Link>
          <button onClick={createUser}>Sign Up</button>
          <p>Already have an account? <Link to="/Login">Login</Link></p>
          <div className="or">
            <div className="line"></div>
            <p>Or</p>
            <div className="line"></div>
          </div>
          <button className='google'  onClick={signupwithgoogle}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="google" width={"20px"}/>Login with Google</button>
        </div>
      </div>
    </>
  )
}

export default Signup
