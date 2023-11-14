import React, {useState} from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import UserForm from './userForm';



export default function SignUp({setLoginUser}){
    const [error, setError] = useState('')

    const handleSignUp =(email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setLoginUser(user);
         
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
            console.log('error', error)
            console.log('error message', errorMessage);
            setTimeout(() => {
                setError('');
            }, 3000);

        });
    }

    return(
        <div>
             <UserForm title="Sign Up" onSubmit={handleSignUp} />
             {error && <div>{error}</div>}
        </div>
    )
}