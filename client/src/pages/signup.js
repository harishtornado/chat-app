import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { useAuth } from "../contexts/authContext";
import axios from "axios";
import { signUpRoute } from "../utils/ApiRoutes";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  // const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("password does not match");
    }

    if (nameRef.current.value === "") {
      return setError("Enter Valid username");
    }

    try {
      setError("");
      setLoading(true);
      // const signupStatus = await signup(
      //   emailRef.current.value,
      //   passwordRef.current.value
      // );
      // if (signupStatus) {
        const { username, password, email } = value;
        const { data } = await axios.post(signUpRoute, {
          username,
          email,
          password,
        });
        console.log(data)
        if (data.status === false) {
          alert(data.msg);
        }
        if (data.status === true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/setAvatar");
        }
      // }
    } catch {
      setError("Failed to create account");
    }
    setLoading(false);
  };

  return (
    <SignUpCard>
      <h2 className="SignUp__header">Sign Up</h2>
      {error && <AlertMessage>{error}</AlertMessage>}
      <form onSubmit={handleSubmit}>
        <input
          ref={nameRef}
          type="text"
          name="username"
          placeholder="Enter your username"
          onChange={handleChange}
        />
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter email"
          name="email"
          required
          onChange={handleChange}
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter password"
          name="password"
          required
          onChange={handleChange}
        />
        <input
          ref={confirmPasswordRef}
          type="password"
          placeholder="Confirm password"
          required
        />
        <button disabled={loading} className="SignUp__button" type="submit">
          Sign up
        </button>
      </form>
      <p className="Login__caption">
        {" "}
        Already have an Account? <Link to="/login">Log In</Link>
      </p>
    </SignUpCard>
  );
};

export default Signup;

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
    color: #fff;
    margin-top: 10px;
    font-size: 12px;
    position: absolute;
    bottom: -30px;
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
