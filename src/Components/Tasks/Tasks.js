import React from "react";
import styled from "styled-components";

const Container = styled.div`
width: 80vw;
`

const Todo = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 10px;
  cursor: pointer;
  border-bottom: 3px solid #282828;
`;

const Logo = styled.div`
  display: inline-block;
  width: 11px;
  height: 11px;
  border: 1.5px solid white;
  border-radius: 50%;
  margin-right: 7px;
`;

const Tasks = () => {
  return (
    <Container>
      <Todo>
        <Logo />
        Some dummy to do
      </Todo>

      <Todo>
        <Logo />
        Some dummy to do
      </Todo>

      <Todo>
        <Logo />
        Some dummy to do
      </Todo>

      <Todo>
        <Logo />
        Some dummy to do
      </Todo>
    </Container>
  );
};

export default Tasks;
