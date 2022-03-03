import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Tasks from "./Tasks/Tasks";
import AddTask from "./Tasks/AddTask";

const Container = styled.div`
  background-color: #1f1f1f;
  color: rgba(255, 255, 255, 0.87);
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
 

 h1{
    margin-top: 100px;
    font-size: 20px;
 }
`;

const Main = (props) => {

  const [todoList, setTodo] = useState(null);
  const [update, setUpdate] = useState()

  useEffect(() => {
    console.log("fetching");
    // setUpdate(false)
    const id = localStorage.getItem("id");
    const data = {
      id: id,
    };
    try {
      fetch("http://localhost:3002/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((json) => {
          setTodo(JSON.parse(json));
          console.log(JSON.parse(json))

        });
    } catch (e) {
      console.log(e);
    }

    return () => {
      // setUpdate(!update)
      console.log('cleanup', update)
    }
  }, [update]);



  return (
    <Container>
    <h1>Tasks</h1>

    <Tasks update={update} setUpdate={setUpdate} todoList={todoList} />

    <AddTask  update={update} setUpdate={setUpdate}/>
    </Container>
  );
};

export default Main;
