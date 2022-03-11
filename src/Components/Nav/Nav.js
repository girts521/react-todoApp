import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import LeftMenu from "./LeftMenu";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../../store/authContext";


const Container = styled.div`
  border: 1px solid black;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.87);
  background-color: #282828;
  border-bottom: 1px solid #1f1f1f;
  padding: 0 12px;
`;

const RightMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 40%;

  div {
    margin-right: 10px;
    padding: 7px;
  }
`;

const Nav = (props) => {
  const authCtx = useContext(AuthContext)
    const name = authCtx.name
  console.log(name)

  const [isLoggedOut, setIsLoggedOut] = useState(false)
  const [hideUser, setHideUser] = useState(false)

  const clickHndler = () => {

    authCtx.logout()
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    setIsLoggedOut(true)
    setTimeout(() => {
      setIsLoggedOut(false)
    }, 1)
  }

  const onInputHover = () => {
    console.log('hovering')
    if(window.innerWidth < 442){
      setHideUser(true)
    }else{
      setHideUser(false)
    }
  }
  const onMouseLeaveHandler = () => {
    setHideUser(false)
  }
  
  const updateEverything = () => {
    console.log('update projects: ',authCtx.updateProject)
    authCtx.setUpdateProject()
    console.log('update projects2: ',authCtx.updateProject)
  }

  // useEffect(() => {
  //   console.log('???')

  // }, [props.isLoggedIn]);

  return (
    <Container>
      <LeftMenu onMouseOff={onMouseLeaveHandler} onHover={onInputHover} />

      <RightMenu>
        {!hideUser && 
        <div>{authCtx.isLoggedIn ? name : <Link  to='/login'>Login</Link> }</div>
        }
        <div>{authCtx.isLoggedIn ? <Link onClick={clickHndler} to='/logout'>Logout</Link> : <Link to='/register'>Register</Link>}</div>
        {isLoggedOut && <Navigate to="/login" />}
      </RightMenu>
    </Container>
  );
};

export default Nav;
