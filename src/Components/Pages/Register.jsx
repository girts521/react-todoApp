import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import MainButton from "../MainButton";
import { Navigate } from "react-router-dom";

import AuthContext from "../../store/authContext";

const Container = styled.div`
  background-color: #1f1f1f;
  color: rgba(255, 255, 255, 0.87);
  height: 70vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`

form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

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

const Error = styled.p `
  color: red;
  margin-top: 10px;
`;


const Register = (props) => {
  const email = useRef();
  const password = useRef();

  const authCtx = useContext(AuthContext)

  const [error, setError] = useState(null)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  const inputHandler = () => {
    const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    const value = email.current.value
    setIsEmailValid(regex.test(value))
  }

  const passwordHandler = () => {
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/g)
    const value = password.current.value
    setIsPasswordValid(regex.test(value))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('submit event')

    const user = {
      email: email.current.value,
      password: password.current.value,
      returnSecureToken: true
    }
    let url;
  
      if(props.login){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4-KzE9DsuUjdBb7qWqiNQsOJiQ1dIeuk'
      }
      if(props.register){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4-KzE9DsuUjdBb7qWqiNQsOJiQ1dIeuk'
      }
      // fetch("http://localhost:3002/register", {
        fetch(url,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.error){
            setError(true)
          }else{
          
          const username = email.current.value.split("@")[0]
          
          authCtx.setName(username)
          
          localStorage.setItem('name', data.email)

          const dbData = {
            username: data.email
          }
          fetch("http://52.28.57.216/register",{
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dbData)
          })
          .then((res) => {
            authCtx.login(data.idToken)
          })

        }})
        .catch((e) => {
          console.log('oops an error')
          console.log(e)
        })
      }

  

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={submitHandler} action="">
        <h1>{props.login ? 'Login' : 'Register'}</h1>
        <input ref={email} style={!isEmailValid ? {border: '1px solid red'} : {border: 'none'}} onInput={inputHandler} type="email" placeholder="Email" />
        <input ref={password} style={!isPasswordValid ? {border: '1px solid red'} : {border: 'none'}} onInput={passwordHandler} type="password" placeholder="Password" />
        {error && <Error>Email or password is wrong! Please try again!</Error>}
        <MainButton width={50}  red text={props.login ? 'Login' : 'Register'} />
        </form>
      </InnerContainer>
      {authCtx.isLoggedIn && <Navigate to="/" />}
    </Container>
  );
};

export default Register;
