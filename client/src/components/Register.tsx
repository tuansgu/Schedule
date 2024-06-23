import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'
const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigateTo = useNavigate()

  const createUser = (e) => {
    e.preventDefault()
    Axios.post('http://localhost:3002/register',{
      Username: username,
      Password: password,
      Email: email
    }).then(()=>{
      navigateTo("/login")
    })
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h2>Register</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" id="username" name="username" placeholder="Username..." onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" name="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" name="password" placeholder="Password..."onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary w-100" onClick={createUser}>Register</button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p>Have an account? <Link to="/login">Log In</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
