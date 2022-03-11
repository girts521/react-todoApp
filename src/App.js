import React, {useState, useContext, useEffect} from 'react';
import Nav from './Components/Nav/Nav';
import Main from './Components/Main';
import Register from './Components/Pages/Register';
import Complated from './Components/Pages/Complated';
import ProjectTodos from './Components/Projects/ProjectTodos';

import { Routes, Route } from "react-router-dom";
import AuthContext from './store/authContext';
import styled from 'styled-components';

//TODO:
//prevent adding empty tasks
// all tasks and priority btns when creating todo
// light and dark theme
// hover animations
// small popup windows with info

const Container = styled.div`
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
`


function App() {

  const authCtx = useContext(AuthContext)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')

    if(savedToken){
      authCtx.login(savedToken)
      const username = localStorage.getItem('name').split("@")[0]
      authCtx.setName(username)
    }

  }, [])


  return (
    <>
    <Nav />
     <Container>
    <Routes>
      <Route path="/" element={authCtx.isLoggedIn ? <Main  /> : <Register login  />} />
     <Route path="/register" element={<Register register />} />
     <Route path="/login" element={<Register login  />} />
     <Route path="/complated" element={<Complated />} />
     <Route path="/project/:id" element={<ProjectTodos />} />
     <Route path="/*" element={<h1>404</h1>} />
    </Routes>
    </Container>

    </>
  );
}

export default App;
