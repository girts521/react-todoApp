import React from "react";
import styled from "styled-components";
import Tasks from "./Tasks/Tasks";
import AddTask from "./Tasks/AddTask";

const Container = styled.div`
  background-color: #1f1f1f;
  color: rgba(255, 255, 255, 0.87);
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
 

 h1{
    margin-top: 100px;
    font-size: 20px;
 }
`;

const Main = (props) => {
  return (
    <Container>
    <h1>Tasks</h1>

    <Tasks />

    <AddTask />
    </Container>
  );
};

export default Main;
