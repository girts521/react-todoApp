import React from "react";
import styled from "styled-components";
import MainButton from "../MainButton";

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

    return ( 
        <Container>
            Projects
            <input id="projectsInput" type="text" placeholder="Enter project name" />
            <MainButton red text='Create' />
        </Container>
    )
}

export default Projects