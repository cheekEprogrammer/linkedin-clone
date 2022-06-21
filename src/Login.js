import React, { useState } from 'react';
import { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from "./firebase";
import "./Login.css";
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();


  const loginToApp = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
      dispatch(login({
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        profileUrl: userCredential.user.profileURL,
      }))  
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error code: " + errorCode + " Error Message: " + errorMessage);
    });

  };

  const register = () => {
    if (!name) {
      return alert("Please enter a full name!");
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name, 
        photoURL: profilePic,
      }).then(() => {
        dispatch(login({
          email: auth.currentUser.email,
          uid: auth.currentUser.uid,
          displayName: name,
          photoURL: profilePic,
        }))
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error code: " + errorCode + " Error Message: " + errorMessage);
    });
  };


  return (
    <div className="login">
      
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Black_bold_spiral.svg/480px-Black_bold_spiral.svg.png" alt="" />

      <form> 
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name (required if registering)"
        type="text" />

        <input value={profilePic} onChange={e => setProfilePic(e.target.value)} placeholder="Profile Pic URL (optional)"
        type="text" />

        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
        type="email" />

        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
        type="password" />

        <button onClick={loginToApp}>Sign In</button>

      </form>

      <p>Not a member?{" "}
          <span onClick={register} className="login__register">Register Now</span>
      </p>

    </div>
  )
}

export default Login;