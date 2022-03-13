import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 80vw;
  max-width: 800px;
`;

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

const Tasks = (props) => {



  const deleteTodo = (e) => {
    console.log('deleting...')
    console.log(e.target.parentNode.dataset.key)
 
    const data = {
      username: localStorage.getItem('name'),
      todoId: e.target.parentNode.dataset.key
    }

    try{
      fetch("https://gkarcevskis-todo.herokuapp.com/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          props.setUpdate(!props.update)
          console.log(props.update)
        })
       

    }catch(e){
      console.log(e)
    }
  }



  return (
    <Container>
      {props.todoList
        ? props.todoList.map((item) => {
            return (
              <div data-key={item.id} key={item.id}>
                <Todo onClick={deleteTodo} >
                  <Logo />
                  {item.todo}
                </Todo>
              </div>
            );
          })
        : "Loading..."}
    </Container>
  );
};

export default Tasks;
