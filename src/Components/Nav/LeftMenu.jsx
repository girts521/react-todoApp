import React, {useState, useRef, useContext} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import BurgerMenu from "./BurgerMenu";
import MainButton from "../MainButton";

import AuthContext from "../../store/authContext";

const Container = styled.div`

  width: 60%;
  max-width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  input {
    height: 25px;
    width: 40%;
    background-color: #363636;
    transition: width 0.3s ease-in;
    /* background-image: url('public/search.svg');
    background-position: 4px 4px;
    background-repeat: no-repeat;
    background-size: 19px;
    padding-left: 30px; */
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
        padding:7px;
        cursor: pointer;
    }

`;

const InputContainer = styled.div`
position: relative;
width: 60%;
`

const SearchResults = styled.div`
position: absolute;
/* top: 20px; */
/* left: 20px; */

margin-top: 5px;
width: 100%;
height: auto;
background-color: #363636;
color: white;

`

const Li = styled.li`
padding: 7px;
margin-top: 5px;
list-style-type: circle;
cursor: pointer;
`

const SearchModal = styled.div`
position: absolute;
top: 100px;
left: 50%;
transform: translate(-50%, 0);
width: 300px;
height: 135px;
background-color: #363636;
color: black;
display: flex;
flex-direction: column;
justify-content: center;

#ModalBtn {
display:flex;
flex-direction: row;
justify-content: center;
}
`

const Todo = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 10px;
  cursor: pointer;
  border-bottom: 3px solid #282828;
  color: white;
`;

const Logo = styled.div`
  display: inline-block;
  width: 11px;
  height: 11px;
  border: 1.5px solid white;
  border-radius: 50%;
  margin-right: 7px;
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



const LeftMenu = (props) => {
    const [isHidden, setIsHidden] = useState(true)
    const menu = useRef()
    const [data, setData] = useState(null)
    const [dataLength, setDataLength] = useState(null)
    const [showModal, setShowModal] = useState(null)
    const [modalData, setModalData] = useState({})
    const [showSearch, setShowSearch] = useState(false)

    const updatectx = useContext(AuthContext)


    const clickHandler = (e) => {
        if (e.target != menu.current.firstChild && !menu.current.firstChild.contains(e.target)){
          setIsHidden(!isHidden)
        }
        if(e.target.id === 'burger' || e.target.parentNode.id === 'burger' || e.target.parentNode.parentNode.id === 'burger'){
          console.log('clicked on burger')
          updatectx.setUpdateProject()
        }
        
    }

    const changeHandler = (e) => {
      console.log(e.target.value)
      if(updatectx.isLoggedIn){
      const username = localStorage.getItem('name')

      const data = {
        username,
        input: e.target.value
      }

      fetch("https://gkarcevskis-todo.herokuapp.com/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        setData(data)
        console.log('data:', data)
        if(data.length){
          setShowSearch(true)
        }else{
          setShowSearch(false)
        }
      })

    }
    }

    const searchClickHandler = (e) => {
      console.log(e.target.dataset.key)
      setShowModal(!showModal)
      const foundTodoData = data.find((item) => item.id === e.target.dataset.key)
      console.log('foundTodo: ',foundTodoData)
      setModalData(foundTodoData)
      // setModalData()
    }

    const inputhover = (e) => {
      console.log('show search: ',showSearch)
      
        setShowSearch(true)
      
      props.onHover()
    }

    const onSearchBlur = () => {
      console.log('search blur')
      console.log(showSearch)
      setShowSearch(false)
    }

    const deleteTodo = () => {
      console.log(modalData)
      const username = localStorage.getItem('name')
      const data = {
        username,
        todoId: modalData.id,
        projectId: modalData.projectId
      }
      fetch("https://gkarcevskis-todo.herokuapp.com/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then( response => {
        updatectx.setUpdateTasks()
        setShowModal(false)
      })
    }

   

    return(
        <Container>
       <div id="burger" onClick={clickHandler}> <FontAwesomeIcon   icon={faBars} /></div>
       <Link to={'/'}> <FontAwesomeIcon icon={faHome} /></Link>
        <InputContainer>
        <input onMouseEnter={inputhover} onMouseLeave={props.onMouseOff} onChange={changeHandler} type="text" />
        {showSearch ? <SearchResults onMouseLeave={onSearchBlur} tabIndex={0}>
        {data ? data.map((item) => {
          return (
              <Li onClick={searchClickHandler} key={item.id} data-key={item.id}>{item.todo}</Li>
          )
        }) : 'Loading...'}
        </SearchResults> : ""}
        </InputContainer>

        
        <MenuContainer  onClick={clickHandler} className={isHidden && 'hidden'}>
          <div ref={menu}>
            <BurgerMenu  hidden={isHidden ? true : false }/>
            </div>
        </MenuContainer>

       {showModal && <SearchModal  >
          <Todo onClick={deleteTodo}><Logo />{modalData && modalData.todo}</Todo>
        <div id="ModalBtn">  <MainButton click={deleteTodo} red text={'Complete'}/></div>
        </SearchModal>}

      </Container>
    )
}

export default LeftMenu