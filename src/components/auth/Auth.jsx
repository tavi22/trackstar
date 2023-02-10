import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from 'react-bootstrap';
import './Auth.scss'


const Auth = () => {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                localStorage.setItem('user', user.email);
            } else {
                setAuthUser(null);
            }
        });
            return () => {
                listen();
            }
    }, []);

    const userSignOut = () => {
        signOut(auth).then(localStorage.setItem('jwt', '')).catch(error => console.log(error));
        navigate('/login');
    }

  return (
    <Stack direction='horizontal' gap='2' className='mb-4'>
      {authUser ? (
        <>
          <Button onClick={userSignOut} variant='danger'>Sign Out</Button>
        </>
      ) : (
        <p></p>
      )}
    </Stack>
  )
}

export default Auth;