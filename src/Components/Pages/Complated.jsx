import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import MainButton from "../MainButton";

import AuthContext from "../../store/authContext";

const Container = styled.div`
  width: 80vw;
  margin: auto;
  color: rgba(255,255,255,0.87);

  h1{
      text-align:center;
      margin-top: 100px;
      font-size: 20px;
  }
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

const Complated =  () => {

const [todos, setTodos] = useState(null)
const [update, setUpdate] = useState(false)

const updatectx = useContext(AuthContext)


useEffect(() => {
    const username = localStorage.getItem('name')
    const userData = {
        username
    }
    
     fetch("https://gkarcevskis-todo.herokuapp.com/completed",{
        method: "POST",
        headers: {
                  "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data)
        setTodos(data)
    })   

}, [update, updatectx.updateTasks]);



const deleteTodo = (e) => {
    console.log('deleting...')
 
    const data = {
      username: localStorage.getItem('name'),
      todoId: e.target.parentNode.dataset.key
    }
      fetch("https://gkarcevskis-todo.herokuapp.com/deleteCompleted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          setUpdate(!update)
          console.log(update)
        console.log(response)
        })
  }

  const restoreTodo = (e) => {

      const data = {
        username: localStorage.getItem('name'),
        todoId: e.target.parentNode.dataset.key
      }

      fetch("https://gkarcevskis-todo.herokuapp.com/restore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          setUpdate(!update)
        console.log(response)
        })
  }


    return (
        <Container>
        <h1>Complated</h1>
        {todos ? todos.map((item) => {
            return(
                <div data-key={item.id} key={item.id}>
                <Todo onClick={deleteTodo} >
                  <Logo />
                  {item.todo}
                </Todo>
                <MainButton text={'Restore'} click={restoreTodo} />
              </div>
                

            )
        }) : 'Loading...'}
        </Container>
    )
}

export default Complated