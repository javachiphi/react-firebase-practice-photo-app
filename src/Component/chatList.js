import React, { useState, useEffect } from 'react'; // Make sure to import useState
import { getDatabase, ref, onChildAdded } from 'firebase/database';

export default function ChatList() {
  const [chats, setChats] = useState([]); // Use useState to define fruits and setChats

  useEffect(() => {
    const db = getDatabase();
    const chatsRef = ref(db, 'chats');

  
    const unsubscribe = onChildAdded(chatsRef, (snapshot) => {
      
        const chatData = snapshot.val();
       
        setChats((prevChats) => [
            ...prevChats,
            { id: snapshot.key, ...chatData },
        ]);
    });

    return () => unsubscribe();
  },[]);
  
  return (
    <div>
      {chats.map(chat => (
        <div key={chat.id}>
          <h3>{chat.name}</h3>
          <div> {chat.dt}</div>
        </div>
      ))}
    </div>
  );
}
