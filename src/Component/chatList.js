import React, { useState, useEffect } from 'react'; // Make sure to import useState
import { ref, onChildAdded } from 'firebase/database';
import { database } from '../firebase';
import moment from 'moment'; 

const isISODate = (dateString) => {
  // An ISO date string will typically start with a four-digit year
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(dateString);
};


const timeFormatter = (timestamp, type) => {
  const dateObject = new Date(timestamp);
  const date = `${dateObject.getMonth() + 1}/${dateObject.getDate()}, ${dateObject.getFullYear()}`;
  const time = dateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  if(type ==='time'){
    return time
  }else if(type === 'date'){
    return date 
  } else {
  return time
  }
}




export default function ChatList() {
  const [chats, setChats] = useState([]); // Use useState to define fruits and setChats

  useEffect(() => {
    // const db = getDatabase();
    const chatsRef = ref(database, 'chats');

  
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
          {chat.url && <img className='post-image' src={chat.url}/>}
          <div className='timestamp'> {timeFormatter(chat.dt, 'time')}</div>
        </div>
      ))}
    </div>
  );
}
