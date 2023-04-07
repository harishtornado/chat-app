import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { useAuth } from "../contexts/authContext";
import axios from "axios";
import { setAvatarRoute } from "../utils/ApiRoutes";
import { Buffer } from "buffer";
import loader from '../assets/loader.gif'

const SetAvatar = () => {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [error, setError] = useState([])

  const api = "https://api.multiavatar.com";

  const setProfilePicture = async () => {
    if(selectedAvatar === undefined){
        setError("Please select an avatar")
    }
    else{
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        const {data} = await axios.put(`${setAvatarRoute}/${user._id}`,{
            image:avatars[selectedAvatar],
        })

        if(data.isSet){
            user.isAvatarImageSet = true
            user.avatarImage = data.image
            localStorage.setItem("chat-app-user",JSON.stringify(user))
            navigate('/chat')
        }
        else{
            setError("")
            setError("Error Setting Avatar. Please try again")
        }
    }
  };

  const fetchAvatar = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const img = Math.round(Math.random() * 1000)
      console.log("hello");
      const image =  await axios.get(
        `${api}/${img}/?apikey=LqufvZep2hbMiT`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
    }

  useEffect(() => {
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
    }
    else{
      fetchAvatar()
    }
  }, []);

  return (
    <>
    {isLoading ? 
        <img src={loader} alt="loading" className="loader" /> :
        (<Container>
            <h2 className="header">Choose an avatar to set as Profile Picture</h2>
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    className={`avatar ${selectedAvatar === index ? " selected" : ""}`}
                    key={index}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      onClick={() => {setSelectedAvatar(index)}}
                    />
                  </div>
                );
              })}
            </div>
            <button className="submit__button" onClick={setProfilePicture}>Set as Profile Picture</button>
            {error[0] ? <h4 className="error__message">{error}</h4> : ""}
          </Container>)
    }
    
    </>
  );
};

export default SetAvatar;

const Container = styled.div`
  height: 80%;
  width: max(60%, 350px);
  background: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  .header {
    font-family: "Edu NSW ACT Foundation", cursive;
    color: #bf54ba;
    position: absolute;
    top: 150px;
  }
  .loader{
    max-inline-size: 100%;
  }
  .avatars{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .avatar{
        margin: 5px;
        padding: 5px;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s ease-in-out;
        border:5px solid transparent;
        img{
            height: max(5.5vw,55px);
            cursor: pointer;
        }
    }
    .selected{
        border:5px solid #bf54ba;
    }
  }
  .submit__button{
    position: absolute;
    padding:10px 20px;
    background:linear-gradient(45deg, #840eab,#ab0e8e,#ab0e61);
    color: #fff;
    font-weight: 700;
    bottom: 150px;
    outline: none;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    text-transform: uppercase;
  }
  .error__message{
    position: absolute;
    bottom: -50px;
    padding: 10px 20px;
    border-radius: 10px;
    background: #fff;
    color: #bf54ba;
  }
`;
