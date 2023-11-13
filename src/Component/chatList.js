import React, { useState, useEffect } from 'react'; // Make sure to import useState
import { ref, onChildAdded } from 'firebase/database';
import { database } from '../firebase';
import moment from 'moment';
import Like from './like';


const groupChatsByDate = (chats) => {
  const groupedChats = {};

  chats.forEach(chat => {
    const date = timeFormatter(chat.dt, 'date');
    if(!groupedChats[date]){
      groupedChats[date] = [];
    }

    groupedChats[date].push(chat);
  } )

  return groupedChats;
}

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
  
  const chatsGroupedByDate = groupChatsByDate(chats);

  const sortedDates = Object.keys(chatsGroupedByDate).sort((a, b) => {
    const dateA = moment(a, 'MMM/D');
    const dateB = moment(b, 'MMM/D');
    return dateB - dateA;
  });

  return (
    <div>
      {sortedDates.map(date => (
        <div key={date}>
          <h2 className='date'>{date}</h2> {/* Display the date */}
          {chatsGroupedByDate[date].map(chat => (
            <div key={chat.id} className='chat'>
              <h3>{chat.name}</h3>
              {chat.url && <img className='post-image' src={chat.url}/>}
              <Like chatId={chat.id}/>
              <div className='timestamp'>{timeFormatter(chat.dt, 'time')}</div> {/* Display the time */}
            </div>
          ))}
        </div>
      ))}



    </div>
  );
}
