import React from "react";
import styled from "styled-components";
import MainButton from "../MainButton";
import TextAreaButtons from "./TextAreaButtons";

const Container = styled.div`
  width: 100%;

  textarea{
    width: 98%;
    height: 100px;
    background-color: #171717;
    color: rgba(255,255,255,0.87);
    border: none;
    outline: 0;
    resize: none;
  }
`;

const ButtonsContainer = styled.div`
display:flex;
flex-direction: row;
justify-content: flex-start;
`

const TextContainer = styled.div`
    width: 100%;
    background-color: #171717;
    border-radius: 5px;
    border: 1px solid #282828;
`

const AddTaskInput = () => {
  return ( 
  <Container>
      <TextContainer>
      <textarea name="" id="" cols="30" rows="10"></textarea>

      <TextAreaButtons />
      </TextContainer>

      <ButtonsContainer>
    <MainButton red text='Add' />
    <MainButton  text='Cancel' />
    </ButtonsContainer>

  </Container>
  )
};

export default AddTaskInput;
