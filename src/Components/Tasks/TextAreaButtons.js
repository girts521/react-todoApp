import React from "react";
import styled from "styled-components";

const Container = styled.div`
display:flex;
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

const Priority = styled.div`

`

const TextAreaButtons = () => {
  return (
    <Container>
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
        All Tasks
      </Button>

      <Button>
        <svg
          data-svgs-path="sm1/priority_flag.svg"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="nonzero"
            d="M5 13.777V19.5a.5.5 0 1 1-1 0V5a.5.5 0 0 1 .223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.82 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0 1 20 4.5V13a.5.5 0 0 1-.223.416c-1.09.727-2.519 1.084-4.277 1.084-1.113 0-1.92-.196-3.658-.776C10.204 13.18 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777zm0-1.123C5.965 12.216 7.133 12 8.5 12c1.113 0 1.92.196 3.658.776 1.638.545 2.371.724 3.342.724 1.45 0 2.614-.262 3.5-.777V5.346c-.965.438-2.133.654-3.5.654-1.113 0-1.92-.196-3.658-.776C10.204 4.68 9.47 4.5 8.5 4.5c-1.45 0-2.614.262-3.5.777v7.377z"
          ></path>
        </svg>
        Priority
      </Button>
    </Container>
  );
};

export default TextAreaButtons;
