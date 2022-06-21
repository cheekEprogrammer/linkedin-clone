import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth, onAuthStateChanged } from "./firebase";

import './App.css';
import Header from './Header';
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Login from "./Login";
import Widgets from './Widgets';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // persistant login check
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // console.log("User signed in: " + uid);
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }))

      } else {
        dispatch(logout());
      }
    });
  // eslint-disable-next-line
  }, []);

  
  return (
    <div className="app">
      {/* Header */}
      <Header />
      {!user ? (
        <Login /> 
      ) : (
        <div className="app__body">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed */}
        <Feed />

        {/* Widgets */}
        <Widgets />


        </div>
      )}
    </div>
  );
}

export default App;
