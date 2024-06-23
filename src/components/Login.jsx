import React, { useState } from 'react';
import { app } from "../firebase";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';


const auth = getAuth(app);
const googleprovider = new GoogleAuthProvider();

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate= useNavigate();

    const handleForgotPassword = async () => {
        const email = prompt('Please enter your email to reset your password:');
        if (email) {
          try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent. Check your inbox!');
          } catch (error) {
            console.error('Error sending password reset email:', error);
            alert('Failed to send password reset email. Please check your email and try again.');
          }
        }}

    const signIn = async () => {
        setError(null);
        try {
            if (email === "" || password === "") {
                setError("Email and password must not be empty");
                return;
            }
            await signInWithEmailAndPassword(auth, email, password).then((value) => alert("successfull sign in"));
            navigate('/');
            setEmail("");
            setPassword("");
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
            <div className="login1">
                <div className="logsign">
                    <h1>Login</h1>
                    <div className="epass">
                        <input
                            type="text"
                            id='signin-email'
                            name='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="signin-email">Email</label>
                    </div>
                    <div className="epass">
                        <input
                            type="password"
                            id='signin-password'
                            name='password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="signin-password">Password</label>
                    </div>
                    <div className={error ? "error" : "noerror"}>{error}</div>
                    <Link to='#' onClick={handleForgotPassword}>Forgot password?</Link>
                    <button onClick={signIn}>Login</button>
                    <p>Don't have an account? <Link to="/Signup">Signup</Link></p>
                    <div className="or">
                        <div className="line"></div>
                        <p>Or</p>
                        <div className="line"></div>
                    </div>
                    <button onClick={signupwithgoogle} className='google'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="google" width={"20px"} />Login with Google</button>
                </div>
            </div>
        </>
    )
}

export default Login
