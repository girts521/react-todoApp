import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../store/authContext";
import AddTask from "../Tasks/AddTask";

const Container = styled.div`
  background-color: #1f1f1f;
  color: rgba(255, 255, 255, 0.87);
  height: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;

  margin-right: 35px;
  margin-left: 35px;

 h1{
    margin-top: 100px;
    font-size: 20px;
 }
`;

const Todo = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 14px;
    margin-right: 14px;
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

const TodosContainer = styled.div`
  width:100%; 
  /* padding-right: 25px;
  padding-left: 25px; */
`


const ProjectTodos = (props) => {

    const [update, setUpdate] = useState()
    const [project, setProject] = useState(null)
    const { id } = useParams();

    const updatectx = useContext(AuthContext)


    useEffect(() => {
      console.log('updating project todos')
        const username = localStorage.getItem('name')
        const data = {
            username,
            id
        }

        fetch("http://localhost:3002/projectTodos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          // console.log('data: ', data)
          if(data){
            setProject(data)
          }
          console.log(project)
        } )
    }, [update, id, updatectx.updateTasks])


    const ckickHandler = (e) => {

        const username = localStorage.getItem('name')
        const data = {
            username,
            projectId: id,
            todoId: e.target.parentNode.dataset.key
        }

        fetch("http://localhost:3002/delete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(res => setUpdate(!update))
        
    }

    return (
      <Container>
        
        <h1>{project && project.projectName}</h1>
      <TodosContainer>
        {project && project.todo.map((item) => {
            return (
                <div onClick={ckickHandler} data-key={item.id} key={item.id}>
                <Todo >
                  <Logo />
                  {item.todo}
                </Todo>
              </div>
            )
        })}
        </TodosContainer> 

        <AddTask project={project ? project.id : false} update={update} setUpdate={setUpdate}/>
        
        </Container>


    )
}

export default ProjectTodos