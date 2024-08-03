import React, {useState, useContext, useEffect} from 'react';
import './index.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import { UserContext } from '../../context/userContext';
import Cookies from "js-cookie"; // Ensure correct import path


const Login = () => {

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Use setUser to update context
  const [data, setData] = useState({
    username: '',
    password: ''
  });
  const [isUserPresent, setIsUserPresent] = useState(false)
  const [error,setError] = useState("")

  useEffect(() => {
    const token = Cookies.get('token'); // Get token from cookies
    setIsUserPresent(token ? true : false)
    if (token)
      navigate("/")
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = data;
    try {
      const { data } = await axios.post('/login', { username, password });
    
      if (data.error) {
        console.log(data.error)
      } else {
        console.log(data)
        setUser(data.user); // Update user context with returned user data
        setData({});
        navigate("/");
      }
    } catch (err) {
      setError(err.response.data.error)
    }
  };
  // console.log(error)


  return (
    !isUserPresent &&
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="card">
          <div className="card-content">
            <h1 className="title">Sign in to your account</h1>
            <form className="form" onSubmit={handleSubmit}>
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
              <div className="form-footer">
                <div className="checkbox-group">
                  <input
                    id="remember"
                    type="checkbox"
                    className="checkbox"
                    required
                  />
                  <label htmlFor="remember" className="checkbox-label">Remember me</label>
                </div>
              </div>

              <button type="submit" className="submit-button">Sign in</button>

              <p className="signup-prompt">
                Don’t have an account yet?<Link  className="signup-link" to='/signup'>Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
