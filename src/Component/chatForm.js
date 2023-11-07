import React, { useState } from 'react';
import { getDatabase, ref, set, push } from 'firebase/database';
// import { fetchFruits } from './fruitList'

export default function ChatForm () {
    const [chat, setChat] = useState('');
    
    const handleClick = () => {
        const db = getDatabase();
        const chatRef = ref(db, 'chats');
        const newChatRef = push(chatRef)
        
        set(newChatRef, {
            name:chat,
            dt: new Date().toLocaleString()
        }).then(() => {
            console.log('data saved');
        }).catch((error) => {
            console.error('failed to save data:', error);
        })

        setChat('');
    }
    
    return(
    <div>
        <input
            type='text' 
            value={chat}
            class='chat-input'
            placeholder='your message'
            onChange={(e) => setChat(e.target.value)}
        />
        <button 
            onClick={handleClick}
            class='chat-input'
        >
        send
        </button>
    </div>)

}