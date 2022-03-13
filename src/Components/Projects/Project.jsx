import React, {useState, useContext} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MainButton from "../MainButton";
import AuthContext from "../../store/authContext";

const Container = styled.div`
margin-top: 15px;
display: flex;
flex-direction: row;
justify-content: space-between;
`

const MyLink = styled(Link)`
padding: 7px;
cursor: pointer;
width: 100%;
`


const Project = (props) => {

    const [redirect, setRedirect] = useState(false)
    const updateCtx = useContext(AuthContext)

    const navigate = useNavigate()

    const deleteProject = () => {
        console.log('delete project')
        const username = localStorage.getItem('name')
        const data = {
            username,
            projectId: props.id
        }
    
        fetch("https://gkarcevskis-todo.herokuapp.com/projectDelete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            console.log(response)
            console.log(updateCtx.updateTasks)
            updateCtx.setUpdateProject() 
            console.log(updateCtx.updateTasks)
            navigate('/')
            // setRedirect(!redirect)
        })
       
    }

    return (
        <Container >
       <MyLink to={`/project/${props.id}`}>{props.text}</MyLink>
       <MainButton click={deleteProject} text={'delete'} />
        </Container>
    )
}

export default Project