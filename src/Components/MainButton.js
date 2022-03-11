import React from "react";
import styled from "styled-components";

const Button = styled.button`
background-color: ${props => props.red ? '#de4c4a' : '#1f1f1f;'};

display: inline-block;
text-align: center;
border: 1px solid ${props => props.red ? 'transparent' : '#525252;'};
border-radius: 5px;
width: ${props => props.width || 30}%;
max-width: 100px;
padding-top: 5px;
padding-bottom: 5px;
margin-top: 10px;
margin-bottom: 10px;
margin-right: 5px;
color:white;
cursor: pointer;
`

const MainButton = (props) => {



const clickHandler = (e) => {
    if(props.set){
        props.set(true)
    }
    if(props.click){
        props.click(e)
    }
    
}

    return (
        <>
        <Button red={props.red} width={props.width} onClick={clickHandler}>{props.text}</Button>
        </>
    )
}

export default MainButton