import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";

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

const LeftMenu = styled.div`
  width: 50%;
  max-width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  input {
    height: 25px;
    width: 30%;
    background-color: #363636;
    transition: width 0.3s ease-in;
    background-image: url(../public/search.svg);
    background-position: 4px 4px;
    background-repeat: no-repeat;
    background-size: 19px;
    padding-left: 30px;
    border: none;
    outline: 0;
    border-radius: 3px;
    color: rgba(255, 255, 255, 0.87);

    &:hover {
      width: 100%;
      border: 1px solid transparent;
    }
  }
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
  return (
    <Container>
      <LeftMenu>
        <FontAwesomeIcon icon={faBars} />
        <FontAwesomeIcon icon={faHome} />
        <input type="text" />
      </LeftMenu>

      <RightMenu>
        <div>Girts</div>
        <div>Logout</div>
      </RightMenu>
    </Container>
  );
};

export default Nav;
