import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login'
import "./index.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/")
    }
  }, [navigate]);

  const responseGoogle = (response) => {
    axios.post("http://localhost:5000/user/googleLogin", { tokenId: response.tokenId })
      .then(data => {
        localStorage.setItem("authToken", data.data.token);
        navigate("/");
      })
      .catch(error => console.log(error))
  }

  const loginHandler = (e) => {
    e.preventDefault();
    console.log(email + " " + password)
    let data = {
      email,
      password
    }
    axios.post("http://localhost:5000/user/login", data)
      .then(data => {
        localStorage.setItem("authToken", data.data.token);
        navigate("/");
      })
      .catch(error => console.log(error))
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{" "}
          </label>
          <input
            type="password"
            required
            id="password"
            className="form-control"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
          Login
        </button>

        <span className="login-screen__subtext">
          Don't have an account? <Link to="/register">Register</Link>
        </span>
        <div className="text-center"> or </div>
        <GoogleLogin
          clientId="1018758315213-slq5oai5qfraltv0nsi8qt7ovb1etfkm.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </form>
    </div>
  );
};

export default Login
