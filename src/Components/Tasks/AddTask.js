import React, {useState} from "react";
import styled from "styled-components";
import AddTaskInput from "./AddTaskInput";

const Container = styled.div`
  display: flex;
  flex-direction: row;

  width: 80vw;

  svg {
    align-items: center;
    border-radius: 50%;
    color: #dd4b39;
    display: inline-flex;
    height: 17px;
    justify-content: center;
    margin-right: 11px;
    width: 17px;
  }
`;

const HiddenAddTask = styled.div`
width: 100%;
display: flex;
flex-direction: row;
`

const AddTask = () => {
const [hidden, setHidden] = useState(true)

const onClickHandler = () => setHidden(!hidden)

  return (
    <Container >
    {hidden ? <HiddenAddTask onClick={onClickHandler}>
      <svg width="13" height="13">
        <path
          d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
          fill="currentColor"
          fillRule="evenodd"
        ></path>
      </svg>
      <div> Add task </div>
      </HiddenAddTask>
      :
      <AddTaskInput />
    }
    </Container>
  );
};

export default AddTask;
