import React, { useState } from 'react';


export default function UserForm({title, onSubmit}){
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(email, password)
    }
    return(
        <>
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
        <div>
          Email: <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          Password: <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
        </>
    )
}

