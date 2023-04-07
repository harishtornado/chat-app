import React, {useState, useEffect } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { sendMessageRoute, getAllMessageRoute } from "../utils/ApiRoutes";
import axios from 'axios'

const ChatContainer = ({ currentChat, currentUser }) => {

  const [messages, setMessages] =useState([])
  const fetchMessage = async () => {
    const response = await axios.post(getAllMessageRoute,{
      from : currentUser._id,
      to : currentChat._id,
    })
    setMessages(response.data)
  }

  useEffect(() =>{
    fetchMessage()
  },[currentChat])

  const handleSendMsg = async (message) => {
    await axios.post(sendMessageRoute, {
      from : currentUser._id,
      to : currentChat._id,
      message : message
    })
  }
  return (
    <>
      {currentChat && (
        <CurrentChatContainer>
          <div className="chat__header">
            <div className="details">
              <img
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                alt="avatar"
              />
              <h3>{currentChat.username}</h3>
            </div>
          </div>
          <div className="messages">
            { messages.map((message) => {
                return(
                    <div className={`message ${message.fromSelf ? " sent" : " received" }`}>
                      <div className="content">{message.message}</div>
                    </div>
                )
              }
            )}
          </div>
          <ChatInput  handleSendMsg={handleSendMsg}/>
        </CurrentChatContainer>
      )}
    </>
  );
};

export default ChatContainer;

const CurrentChatContainer = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  background: grey;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  padding: 20px;
  border-radius: 10px;
  justify-content: space-between;
  .chat__header {
    flex: 0.12;
    background: #bf54ba;
    border-radius: 4px;
    border: 2px solid #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 20px;
    .details{
      display: flex;
      gap: 2rem;
      align-items: center;
      img {
        height: 3rem;
        border: solid 2px #fff;
        border-radius: 100%;
      }
      h3 {
        color: #fff;
        font-weight: 700;
      }
    }
  }
  .messages{
    flex:0.78;
    background: #fff;
    border-radius:4px;
    border: 2px solid #bf54ba;
    overflow: scroll;
    padding:20px;
    display: flex;
    flex-direction: column;
    ::-webkit-scrollbar{
        display: none;
    }
    .message{
      margin-bottom:5px;
      display: flex;
      align-items: center;
      .content{
        padding:5px 10px;
        border-radius: 10px;
        color: #fff;
        background: #000;
        width: fit-content;
        max-width:40%;
        overflow-wrap: break-word;
      }
    }
    .received{
      justify-content: flex-start;
    }
    .sent{
      justify-content: flex-end;
      .content{
        background: #bf54ba;
      }
    }
  }
`;
