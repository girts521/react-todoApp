import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../store/authContext";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  padding: 7px;
  cursor: pointer;
`;

const Priority = styled.div``;

const AllTasksContainer = styled.div`
  position: relative;
`;

const TasksPopup = styled.div`
  position: absolute;
  inset: auto auto 0px 0px;
  transform: translate3d(-15px, -35px, 0px);
  background-color: #282828;
  border: 1px solid #171717;
  box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);

  max-height: 200px;
  min-width: 150px;

  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #1f1f1f;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    /* background: #888; */
    background: #343a40;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  h3 {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  li {
    list-style-type: circle;
    padding: 7px;
    margin-top: 5px;
    cursor: pointer;
  }
`;

const TextAreaButtons = (props) => {
  const [projects, setProjects] = useState(null);
  // const [openProject, setOpenProject] = useState("All tasks")
  const [btnText, setBtnText] = useState("All tasks");
  const [showPopup, setShowPopup] = useState(null);

  const projectBtn = useRef();
  const { id } = useParams();

  const username = localStorage.getItem("name");

  const authCtx = useContext(AuthContext);


  useEffect(() => {
    console.log('effect on task area', id)
    
    if(id){

    const data = {
      username,
      projectId: id
    }

    fetch("https://gkarcevskis-todo.herokuapp.com/findProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
      setBtnText(res.projectName)
      props.getProjectId(res.id)
    })
  }
    
  }, []);



  const clickHandler = () => {
    console.log("clicked");
    setShowPopup(!showPopup);

    if (authCtx.isLoggedIn) {
      

      const data = {
        username,
      };

      fetch("https://gkarcevskis-todo.herokuapp.com/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setProjects(data);
          console.log(data);
        });
    } else {
      setProjects(null);
    }
  };

  const chooseProject = (e) => {
    setShowPopup(!showPopup);
    if (e.target.id) {
      props.getProjectId(e.target.id);
    }
    if (e.target.innerText === "All tasks") {
      props.getProjectId(null);
    }
    setBtnText(e.target.innerText);
  };

  return (
    <Container>
      <AllTasksContainer>
        <Button onClick={clickHandler}>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <g fill="#4361ee">
              <path
                d="M13.5 9.5V12a1.5 1.5 0 01-1.5 1.5H4A1.5 1.5 0 012.5 12V9.5h3.75a1.75 1.75 0 003.5 0h3.75z"
                opacity="0.1"
              ></path>
              <path d="M10.491 2a2 2 0 011.923 1.45l1.509 5.28a2 2 0 01.077.55V12a2 2 0 01-2 2H4a2 2 0 01-2-2V9.28a2 2 0 01.077-.55l1.509-5.28A2 2 0 015.509 2h4.982zm0 1H5.51a1 1 0 00-.962.725l-1.509 5.28A1 1 0 003 9.28V12a1 1 0 001 1h8a1 1 0 001-1V9.28a1 1 0 00-.038-.275l-1.51-5.28a1 1 0 00-.96-.725zM6.25 9a.5.5 0 01.5.5 1.25 1.25 0 002.5 0 .5.5 0 01.5-.5h1.75a.5.5 0 110 1h-1.306a2.25 2.25 0 01-4.388 0H4.5a.5.5 0 010-1z"></path>
            </g>
          </svg>
          <div ref={projectBtn}>{btnText}</div>
        </Button>
        {showPopup && (
          <TasksPopup>
            <h3>Choose a project</h3>
            <li onClick={chooseProject}>All tasks</li>
            {projects
              ? projects.map((item) => {
                  return (
                    <li onClick={chooseProject} key={item.id} id={item.id}>
                      {item.projectName}
                    </li>
                  );
                })
              : ""}
          </TasksPopup>
        )}
      </AllTasksContainer>

      {/* <Button>
        <svg
          data-svgs-path="sm1/priority_flag.svg"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="nonzero"
            d="M5 13.777V19.5a.5.5 0 1 1-1 0V5a.5.5 0 0 1 .223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.82 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0 1 20 4.5V13a.5.5 0 0 1-.223.416c-1.09.727-2.519 1.084-4.277 1.084-1.113 0-1.92-.196-3.658-.776C10.204 13.18 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777zm0-1.123C5.965 12.216 7.133 12 8.5 12c1.113 0 1.92.196 3.658.776 1.638.545 2.371.724 3.342.724 1.45 0 2.614-.262 3.5-.777V5.346c-.965.438-2.133.654-3.5.654-1.113 0-1.92-.196-3.658-.776C10.204 4.68 9.47 4.5 8.5 4.5c-1.45 0-2.614.262-3.5.777v7.377z"
          ></path>
        </svg>
        Priority
      </Button> */}
    </Container>
  );
};

export default TextAreaButtons;
