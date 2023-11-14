import React, { useState, useEffect } from "react";
import "./App.css";
import ChatForm from "./Component/chatForm";
import ChatList from './Component/chatList';
import AuthForm from "./Component/AuthForm";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from './firebase';

import app from './firebase';


//if user logged in, show chatList/chatform -> if user is not logged in, show sign in or signup form 
// 

function App() {
  const [loginUser, setLoginUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginUser(user);
      } else {
        // User is signed out
        // ... send to log in form. 
      }
    });

  })


  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      setMessage('sign out successfully');
      setLoginUser(null);
      setTimeout(() => {
        setMessage('');                
    }, 2000);
    })
    .catch((error) => {
      setMessage(error);

    })
  }


  return (
    <div className="App">
      <header className="App-header">
        <h2>Chat!Chat!Chat! 💬</h2>
        {loginUser ? 
        (
          <>
          <div>Welcome {loginUser.email}</div>   
          <button 
          onClick={handleSignOut}
          >
            Sign Out
            </button>
          {message && message}    
        <ChatList />
        <ChatForm />
        </>

        ) : ( 
          <>
        <AuthForm setLoginUser={setLoginUser}/>
         </>
        )
        }
      

      </header>
    </div>
  );
}

export default App;
