import React, {useState, useRef} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import BurgerMenu from "./BurgerMenu";


const Container = styled.div`

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
    background-image: url('public/search.svg');
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

#burger{
        z-index: 3;
    }

`;

const MenuContainer = styled.div`
position: absolute;
top: 0;
right: 0;
width: 100vw;
height: 100vh;
background-color: transparent;
z-index: 2;
transition: all 0.2s ease-out;

&.hidden{
    position: absolute;
    transform: translateX(-100%);
  }
`



const LeftMenu = () => {
    const [isHidden, setIsHidden] = useState(true)
    const menu = useRef()

    const clickHandler = (e) => {
        console.log('click')
        console.log(e.target.parentNode)
        console.log(menu.current.firstChild)
        if (e.target != menu.current.firstChild && !menu.current.firstChild.contains(e.target)){
    
          setIsHidden(!isHidden)
        }
        
    }

    return(
        <Container>
       <div id="burger"> <FontAwesomeIcon  onClick={clickHandler} icon={faBars} /></div>
        <FontAwesomeIcon icon={faHome} />
        <input type="text" />
        
        <MenuContainer onClick={clickHandler}  className={isHidden && 'hidden'}>
          <div ref={menu}>
            <BurgerMenu  hidden={isHidden ? true : false }/>
            </div>
        </MenuContainer>
      </Container>
    )
}

export default LeftMenu