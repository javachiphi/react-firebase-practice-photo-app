import React, { useState, useRef } from 'react';
import { storage } from '../firebase';
import { getDatabase, ref, set, push } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'


const STORAGE_KEY = 'images/'
export default function ChatForm () {
    const [chat, setChat] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');


    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const writeData = (url) => {
        const db = getDatabase();
        const chatRef = ref(db, 'chats');
        const newChatRef = push(chatRef)

        set(newChatRef, {
            name:chat,
            dt: new Date().toISOString(),
            url: url
        }).then(() => {
            console.log('data saved');
        }).catch((error) => {
            console.error('failed to save data:', error);
        })

        setChat('');
        setFile('');

    }
    
    const handleClick = () => {
        if(!file || !chat){ 
            setError('please upload the photo or write chat');
            setTimeout(() => {
                setError('');                
            }, 2000);
        } else {
        const fullStorageRef = file && storageRef(storage, STORAGE_KEY + file.name);
        uploadBytes(fullStorageRef, file).then((snapshot) => {
            getDownloadURL(fullStorageRef, file)
            .then(
                (url)=> {
                    writeData(url);
                }
            )
            console.log('Uploaded a blob or file!');
          });

        }

    
    }
    
    return(
    <div>
        <input 
            type='file'
            onChange={handleFileChange}
            ref={fileInputRef}
        />
        <input
            type='text' 
            value={chat}
            className='chat-input'
            placeholder='your message'
            onChange={(e) => setChat(e.target.value)}
        />
        <button 
            onClick={handleClick}
            className='chat-input'
        >
        send
        </button>
        {error}
    </div>)

}