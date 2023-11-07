import React from "react";
import "./App.css";
import ChatForm from "./Component/chatForm";
import ChatList from './Component/chatList'
import app from './firebase';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h2>Chat!Chat!Chat! 💬</h2>
        <ChatList />
        <ChatForm />
      </header>
    </div>
  );
}

export default App;
