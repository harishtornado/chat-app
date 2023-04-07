import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Contacts = ({ contacts , chatChange}) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (contact , index) => {
    setCurrentSelected(index)
    chatChange(contact)
  }
  
  return (
    <>
      {contacts &&
        contacts.map((contact, index) => {
          return <ContactItem key={index}>
            <div className={`contact ${currentSelected === index ? " selected" : "" }`} onClick={ () => changeCurrentChat(contact ,index)}>
              <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
              <h3>{contact.username}</h3>
            </div>
          </ContactItem>;
        })
      }
    </>
  );
};

export default Contacts;

const ContactItem = styled.div`
  width: 100%;
  height: 69px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom:10px;
  .contact{
    width: 100%;
    height:100%;
    background: #fff;
    display: flex;
    align-items: center;
    gap:2rem;
    padding: 0px 20px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s;
    img{
      height: 3rem;
    }
    h3{
      text-transform: captalize;
      font-weight: 800;
    }
  }
  .selected{
    background: #000;
    h3{
      color: white;
    }
  }
`;
