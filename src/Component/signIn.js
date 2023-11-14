import React, {useState} from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import UserForm  from './userForm';



export default function SignIn({setLoginUser}) {
    const [error, setError] = useState('')

    const handleSignIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setLoginUser(user);
            // ...
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
            <UserForm title="Sign In" onSubmit={handleSignIn} />
             {error && <div>{error}</div>}
        </div>
    )
}