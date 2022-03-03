import React, {useEffect, useState} from "react";
import styled from "styled-components";
import LeftMenu from "./LeftMenu";
import { Link } from "react-router-dom";


const Container = styled.div`
  border: 1px solid black;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.87);
  background-color: #282828;
  border-bottom: 1px solid #1f1f1f;
  padding: 0 12px;
`;

const RightMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    margin-right: 10px;
    padding: 7px;
  }
`;

const Nav = () => {

  const [name, setName] = useState(localStorage.getItem('name'))
  

  useEffect(() => {
    console.log('???')

  }, [name]);

  return (
    <Container>
      <LeftMenu />

      <RightMenu>
        <div>{name}</div>
        <div><Link to='/register'>Register</Link></div>
      </RightMenu>
    </Container>
  );
};

export default Nav;
