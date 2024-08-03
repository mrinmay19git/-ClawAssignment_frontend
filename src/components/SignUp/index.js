
import './index.css';
import React, { useState } from 'react';
// import Cookies from 'js-cookie'

import './index.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

  

const SignUp = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: ''
  })


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = data
    try {
      const { data } = await axios.post('/register', {
        username, password
      })
      console.log(data)
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success("SignUp Successful. Welcome!")
        navigate("/login")
      }
    } catch (error) {
      console.log("error")

    }

  };
  // const jwtToken = Cookies.get('joken')
  // if (jwtToken ) {
  //   return navigate("/")
  // }
  return (
    <section className="bg-gray-50 dark:bg-gray-900 main-con">
      
      <div className="container">
        <div className="form-container">

          <div className="form-content">
            <h1 className="title">Create an account</h1>

            <form className="form"  onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="label">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input"
                  placeholder="name@mail.com"
                  value={data.username}
                  onChange={(e) => setData({ ...data, username: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="input"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  required
                />
              </div>
      
              <div className="checkbox-group">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="checkbox"
                  required
                />
                <label htmlFor="terms" className="checkbox-label">
                  I accept the <span className="link" >Terms and Conditions</span>
                </label>
              </div>
              <button type="submit" className="submit-button">Create an account</button>
              <button type="submit" className='login-button'>SignUp</button>
              <p className="login-text">
                Already have an account? 
                <Link className="link" to='/login'>Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default SignUp;
