import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import MainButton from "../MainButton";
import { useLocation, Navigate } from "react-router-dom";
import useFetch from "../../useFetch";

const Container = styled.div`
  background-color: #1f1f1f;
  color: rgba(255, 255, 255, 0.87);
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    height: 25px;
    background-color: #363636;
    border: none;
    outline: 0;
    border-radius: 3px;
    color: rgba(255, 255, 255, 0.87);
    margin-top: 10px;
  }
`;

const Register = () => {
  const username = useRef();
  const password = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({});
  const location = useLocation();
  // const data = useFetch('http://127.0.0.1:3002/')

  useEffect(() => {
    if (data.logged === true) {
      setIsLoggedIn(true);
    }
  }, [data]);

  const clickHandler = () => {
    const usernameValue = username.current.value;
    const passwordValue = password.current.value;
    const user = {
      username: username.current.value,
      password: password.current.value
    }
    console.log('user: ', user)
    try {
      fetch("http://localhost:3002/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then((response) => response.json())
        .then((json) => {
          const parsedJson = JSON.parse(json);
          setData(parsedJson);
          const name = parsedJson.username
          const id = parsedJson.id
          localStorage.setItem('name', name)
          localStorage.setItem('id', id)
        });
    } catch (e) {
      console.log(e);
    }
    // console.log(data)
  };

  return (
    <Container>
      <InnerContainer>
        <h1>Register</h1>
        <input ref={username} type="username" placeholder="Username" />
        <input ref={password} type="password" placeholder="Password" />
      </InnerContainer>
      <MainButton click={clickHandler} red text="Register" />
      {isLoggedIn && <Navigate to="/" />}
    </Container>
  );
};

export default Register;
