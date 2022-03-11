import React, {useRef, useState} from "react";
import styled from "styled-components";
import MainButton from "../MainButton";
import TextAreaButtons from "./TextAreaButtons";

const Container = styled.div`
  width: 100%;
  margin-top: 50px;

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

const AddTaskInput = (props) => {

  const input = useRef()

  const [projectId,setProjectId] = useState(null)

  const getProjectId = (id) => {
    // if(id){
      console.log(id)
      setProjectId(id)
    // }
  }


  const clickHandler = () => {
    const inputValue = input.current.value
    let project

    if(props.project){
       project = props.project
    }
    if(projectId){
      project = projectId
    }else {
       project = ''
    }

    const data = {
      username: localStorage.getItem('name'),
      todo: inputValue,
      project
    }

    if(inputValue){

    try{
      fetch("http://localhost:3002/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          console.log(res)
          props.setUpdate(!props.update)
          input.current.value = ''
        })

    }catch(e){
      console.log(e)
    }
  }
  }



  return ( 
  <Container>
      <TextContainer>
      <textarea autoFocus ref={input} name="" id="" cols="30" rows="10"></textarea>

      <TextAreaButtons getProjectId={getProjectId} />
      </TextContainer>

      <ButtonsContainer>
    <MainButton red click={clickHandler} text='Add' />
    <MainButton hidden={props.hidden} set={props.set} text='Cancel' />
    </ButtonsContainer>

  </Container>
  )
};

export default AddTaskInput;
