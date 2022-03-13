import React, {useRef, useEffect, useState, useContext} from "react";
import styled from "styled-components";
import MainButton from "../MainButton";
import Project from "./Project";
import AuthContext from "../../store/authContext";

const Container = styled.div`
margin-top: 50px;
margin-left: 29px;

#projectsInput {
    height: 25px;
    width: 70%;
    background-color: #363636;
    border: none;
    outline: 0;
    border-radius: 3px;
    color: rgba(255, 255, 255, 0.87);
    margin-top: 10px;
}
`


const Projects = () => {
    const input = useRef();
    const username = localStorage.getItem('name')
    
    const [update, setUpdate] = useState(false)
    const [projects, setProjects] = useState(null)

    const authCtx = useContext(AuthContext)

    const clickHandler = () => {
        if(authCtx.isLoggedIn){
        const inputValue = input.current.value;
        const data = {
            username,
            projectName: inputValue
        }

        fetch("https://gkarcevskis-todo.herokuapp.com/projectAdd", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            setUpdate(!update)
            input.current.value = ''
        })
    }else{
        console.log('nothing')
    }
    }

    useEffect(() => {
        console.log('fetching projects')
        console.log(authCtx.isLoggedIn)
        if(authCtx.isLoggedIn){

         const data = {
            username
        }

        fetch("https://gkarcevskis-todo.herokuapp.com/projects", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            setProjects(data)
            console.log(data)
        })
    }else{
        setProjects(null)
    }
    
    }, [update, authCtx.updateProject]);

    return ( 
        <Container>
            Projects
            {projects ? projects.map((item) => {
                return (
                    
                    <Project key={item.id} id={item.id} text={item.projectName} />
                    
                )
            }) : ''}
            <input ref={input} id="projectsInput" type="text" placeholder="Enter project name" />
            <MainButton red click={clickHandler} text='Create' />
        </Container>
    )
}

export default Projects