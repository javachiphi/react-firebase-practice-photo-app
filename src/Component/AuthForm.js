import React, { useState } from 'react';
import SignIn from './signIn';
import SignUp from './signUp';

export default function AuthForm({ setLoginUser }) {
  const [activeForm, setActiveForm] = useState('signin'); // 'signin' or 'signup'
  
  
  return (
    <div>
      <button onClick={() => setActiveForm('signin')}>Sign In</button>
      <button onClick={() => setActiveForm('signup')}>Sign Up</button>
      {activeForm === 'signin' ? (
        <SignIn setLoginUser={setLoginUser} />
      ) : (
        <SignUp setLoginUser={setLoginUser} />
      )}
    </div>
  );
}
