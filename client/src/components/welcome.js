import React from "react";
import styled from "styled-components";

const Welcome = ({ currentUser }) => {
  return (
    <>
      <WelcomeSection>
        <img src="" alt="" />
        <h3>
          Welcome <span>{currentUser.username}</span>
        </h3>
        <p>Select a chat to start Messaging</p>
      </WelcomeSection>
    </>
  );
};

export default Welcome;

const WelcomeSection = styled.div`
    text-align: center;
    h3{
        font-size:30px;
        span{
            color: #BF54BA;
        }
    }
    p{
        font-weight:600;
    }
`
