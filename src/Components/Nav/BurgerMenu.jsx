import React,{useContext} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory} from "@fortawesome/free-solid-svg-icons";
import Projects from "../Projects/Projects";
import { Link } from "react-router-dom";
import AuthContext from "../../store/authContext";

const Container = styled.div`
  width: 70%;
  height: 100vh;
  transition: all 0.2s ease-out;
  max-width: 330px;
  background-color: #282828;
  padding-top: 100px;
  z-index: 1;

  &.hidden{
    position: absolute;
    transform: translateX(-100%);
  }
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 22px;
  margin-bottom: 10px;
  padding: 7px;
  cursor: pointer;

  svg{
      margin-right: 5px;
  }
`;

const BurgerMenu = (props) => {

  const authCtx = useContext(AuthContext)

  return (
    <Container className={props.hidden && 'hidden'} >
      
        <Button>
        <svg width="16" height="16" viewBox="0 0 16 16">
          <g fill="#4361ee">
            <path
              d="M13.5 9.5V12a1.5 1.5 0 01-1.5 1.5H4A1.5 1.5 0 012.5 12V9.5h3.75a1.75 1.75 0 003.5 0h3.75z"
              opacity="0.1"
            ></path>
            <path d="M10.491 2a2 2 0 011.923 1.45l1.509 5.28a2 2 0 01.077.55V12a2 2 0 01-2 2H4a2 2 0 01-2-2V9.28a2 2 0 01.077-.55l1.509-5.28A2 2 0 015.509 2h4.982zm0 1H5.51a1 1 0 00-.962.725l-1.509 5.28A1 1 0 003 9.28V12a1 1 0 001 1h8a1 1 0 001-1V9.28a1 1 0 00-.038-.275l-1.51-5.28a1 1 0 00-.96-.725zM6.25 9a.5.5 0 01.5.5 1.25 1.25 0 002.5 0 .5.5 0 01.5-.5h1.75a.5.5 0 110 1h-1.306a2.25 2.25 0 01-4.388 0H4.5a.5.5 0 010-1z"></path>
          </g>
        </svg>
        {authCtx.isLoggedIn ? <Link to='/'>All Tasks</Link> : <Link to='/login'>All Tasks</Link> }
      
      </Button>

      <Button>
      <FontAwesomeIcon color='#dd4b39' icon={faHistory} />
      {authCtx.isLoggedIn ? <Link to='/complated'>Complated tasks</Link> : <Link to='/login'>Complated tasks</Link> }
      </Button>

      <Projects />
    </Container>
  );
};

export default BurgerMenu;
