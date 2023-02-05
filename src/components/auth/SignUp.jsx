import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const register = (e) => {
      e.preventDefault();     
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          navigate('/login');
        }).catch((error) => {
          console.log(error);
        });
    }

  return (
    <Container>
      <div className='register-container'>
          <form onSubmit={register}>
              <h1>Create a new Account</h1>
              <input type='email'
              placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} ></input>
              <input type='password'
              placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}></input>
              <button type='submit'>Register</button>
          </form>
      </div>
      <div className='extra-buttons'>
      <p>Already have an account?  <NavLink to="/login">Login here</NavLink>.</p>
      </div>
    </Container>
  )
}

export default SignUp;