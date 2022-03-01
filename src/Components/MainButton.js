import React from "react";
import styled from "styled-components";



const MainButton = (props) => {

    const Button = styled.div`
    background-color: ${props.red ? '#de4c4a' : '#1f1f1f;'};

    display: inline-block;
    text-align: center;
    border: 1px solid ${props.red ? 'transparent' : '#525252;'};
    border-radius: 5px;
    width: 30%;
    max-width: 100px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 5px;
    cursor: pointer;
    `

    return (
        <>
        <Button>{props.text}</Button>
        </>
    )
}

export default MainButton