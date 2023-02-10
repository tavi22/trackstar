import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { NavLink, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './SignIn.scss'


const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const jwt = localStorage.getItem('jwt');

    const login = (e) => {
      e.preventDefault();     
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          localStorage.setItem('jwt', userCredential.user.accessToken);
          navigate(from, { replace: true });
        }).catch((error) => {
          console.log(error);
        });
    }

  return (
    <Container>
      { jwt === '' ? (
        <div className='register-container'>
          <form onSubmit={login}>
              <h1>Log In to your Account</h1>
              <input type='email'
              placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} ></input>
              <input type='password'
              placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}></input>
              <button type='submit'>Log In</button>
          </form>
      </div>
      ) : (
        <Navigate to='/'/>
      )}
      
      <div className='extra-buttons'>
      <p>Don't have an account?  <NavLink to="/register">Register here</NavLink>.</p>
      </div>
    </Container>
  )
}

export default SignIn;