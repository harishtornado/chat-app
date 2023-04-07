import React, { useState , useEffect }from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"
import { allUsersRoute } from "../utils/ApiRoutes";
import axios from "axios";
import Contacts from "../components/Contacts"
import ChatContainer from "../components/ChatContainer";
import Welcome from "../components/welcome";
import Logout from "../components/Logout";

const Chat = () => {
  const navigate = useNavigate()
  const [contacts,setContacts] = useState([])
  const [currentUser,setCurrentUser] = useState(undefined)
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentChat,setCurrentChat] =useState(undefined);
  const [isLoaded,setIsLoaded] = useState(false);

  useEffect(() => {
    const checkCurrUser = async ()=> {
      if(!localStorage.getItem("chat-app-user")){
        navigate("/login")
      }
      else{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
        setIsLoaded(true)
      }
    }
    checkCurrUser()
  },[])

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data)
        }
        else{
          // navigate("/setAvatar")
        }
      }
    }
    fetchContacts()
  },[currentUser])


  const handleChatChange =(chat) => {
    setCurrentChat(chat)
  }

  return (
    <ChatComponent>
      <SideBarSection>
        <SideBarSectionHeader>
          <div className="logo"></div>
          <div className="sidebarheader__menu">menu</div>
        </SideBarSectionHeader>
        <ContactSection>
          <Contacts contacts={contacts} currentUser={currentUser} chatChange={handleChatChange}/>
        </ContactSection>
        <UserContact>
          <div className="user__details">
            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
            <h3>{currentUserName}</h3>
          </div>
          <Logout />
        </UserContact>
      </SideBarSection>
      <ChatSection>
        {isLoaded && !currentChat ? <Welcome currentUser={currentUser}/> : <ChatContainer currentChat={currentChat} currentUser={currentUser}/> 

        }
      </ChatSection>
    </ChatComponent>
  );
};

export default Chat;

const ChatComponent = styled.div`
  width: 95%;
  height: 90vh;
  background: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: -2px 6px 10px -6px #000;
`;

const SideBarSection = styled.div`
  display: flex;
  flex: 0.35;
  background: #bf54ba;
  height: 100%;
  box-shadow: inset 0px 0px 15px -5px #fff;
  border: solid 10px #fff;
  border-radius: 20px;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin: auto;
  padding: 20px;
  position: relative;
  user-select: none;
`;

const ChatSection = styled.div`
  display: flex;
  flex: 0.65;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 10px 0 0 ;
`;
const SideBarSectionHeader = styled.div`
  background-color: #fff;
  width: 100%;
  flex: 0.13;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  .logo{
    width: 35px;
    height: 35px;
    background: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOxRPZGnwIEB4LtHmRUJWeK-hHukVwhmAZsA&usqp=CAU");
    background-position: center;
    background-repeat: none;
    background-size: cover;
    border-radius:10px;
  }
`

const ContactSection = styled.div`
  width: 100%;
  display: flex;
  flex: 0.70;
  background: rgba(255,255,255,0.5);
  border: 3px solid #fff;
  border-radius: 5px;
  padding:10px;
  overflow: scroll;
  flex-direction:column;
  ::-webkit-scrollbar{
    display: none;
  }
`

const UserContact = styled.div`
  width: 100%;
  flex:0.14;
  background: #000;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  .user__details{
    display: flex;
    align-items: center;
    gap:1rem;
    img{
      border-radius: 100%;
      border: 2px solid #fff;
      height: 3rem;
    }
    h3{
      color: #fff;
    }
  }
`