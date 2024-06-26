// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import Axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigateTo = useNavigate()

  const loginUser = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3002/login', {
      Username: username,
      Password: password,
    })
      .then((response) => {
        if (response.data.message === "Invalid username or password") {
          alert("Username or password incorrect!!!");
          navigateTo('/login');
        } else {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          alert("Log In Successfully")
          console.log('User data from localStorage:', response.data.user);
          navigateTo('/home');
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Error logging in. Please try again.");
      });
  }



  return (
    <div className="container">
      <div className="row justify-content-center mt-3">
        <div className="col-md-6 form-column">
          <div className='background'></div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h2>Log In</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" id="username" name="username" placeholder="Username..." onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" name="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary w-100" onClick={loginUser}>Log In</button>
              </form>
            </div>
            <div className="card-footer text-center">
              <Link to="/Register">Sign Up Here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
