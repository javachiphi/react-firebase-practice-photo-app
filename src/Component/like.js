import React, { useState } from 'react';
import { database } from '../firebase';
import { ref, set} from 'firebase/database';



export default function Like({chatId}) {
    const [like, setLike] = useState(0);
    const [toggle, setToggle] = useState(false);

    const handleClick = () => {
        setToggle(currToggle  => {
            const newToggle = !currToggle;
            const newLikeCount = newToggle ? 1 : 0;
            setLike(newLikeCount);
            writeData(chatId, newLikeCount);
            return newToggle;
        })
    }

    const writeData = async(chatId, likeCount) => {
        const likeRef = ref(database, 'chats/' + chatId + '/like');
        set(likeRef,likeCount)
        .then(() => {
            console.log('data saved');
        }).catch((error) => {
            console.error('failed to save data:', error);
        })
    

    }


    return(
    <div>
        <div>like count:{like}</div>
        <button onClick={handleClick}>
            like 
        </button>
    </div>
    )
}