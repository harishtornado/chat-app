import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import { useAuth } from "../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/ApiRoutes";
import axios from "axios"

const Login = () => {
  const nameRef = useRef();
  const passwordRef = useRef();
  // const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [value, setValue] = useState({
    username: "",
    password: "",
  });


  useEffect(() => {
    if(localStorage.getItem('chat-app-user')){
      navigate("/chat")
    }
  })

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      // const loginStatus = await login(emailRef.current.value, passwordRef.current.value);
      // if (loginStatus) {
        const { username, password } = value;
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
        console.log(data)
        if (data.status === false) {
          setError(data.msg)
        }
        if (data.status === true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/chat");
        }
      }
    // } 
    catch {
      setError("Failed to Sign in");
    }
    setLoading(false);
  };

  return (
    <SignUpCard>
      <h2 className="SignUp__header">Log In</h2>
      {error && <AlertMessage>{error}</AlertMessage>}
      <form onSubmit={handleSubmit}>
        <input ref={nameRef} type="text" placeholder="Enter userName" name="username" required onChange={handleChange} />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter password"
          required
          onChange={handleChange}
          name="password"
        />
        <button disabled={loading} className="SignUp__button" type="submit">
          Log In
        </button>
      </form>
      <p className="Login__caption"> Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </SignUpCard>
  );
};

export default Login;

const SignUpCard = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.4);
  .SignUp__header {
    color: #fff;
    margin-bottom: 10px;
  }
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    input {
      margin: 10px;
      padding: 10px 20px;
      border-radius: 2px;
      border: none;
      outline: none;
      width: 100%;
    }
    .SignUp__button {
      width: 100%;
      margin: 10px;
      padding: 10px;
      border: none;
      border-radius: 2px;
      background: linear-gradient(45deg, #840eab, #ab0e8e, #ab0e61);
      color: #fff;
      text-transform: uppercase;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.3s;
      &:hover {
        transform: scale(0.97);
      }
    }
  }
  .Login__caption {
    margin-top: 10px;
    font-size: 12px;
    position: absolute;
    bottom: -30px;
    color: #fff;
  }
`;

const AlertMessage = styled.div`
  width: 100%;
  background: rgba(230, 7, 74, 0.7);
  border-radius: 2px;
  padding: 5px;
  font-size: 12px;
  text-align: center;
  color: #fff;
`;
