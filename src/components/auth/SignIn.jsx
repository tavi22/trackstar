import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { NavLink, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = (e) => {
      e.preventDefault();     
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          localStorage.setItem('jwt', userCredential.user.accessToken);
          navigate('/home');
        }).catch((error) => {
          console.log(error);
        });
    }

  return (
    <Container>
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
      <div className='extra-buttons'>
      <p>Don't have an account?  <NavLink to="/register">Register here</NavLink>.</p>
      </div>
    </Container>
  )
}

export default SignIn;