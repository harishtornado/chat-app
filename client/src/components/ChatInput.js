import React,{ useState } from 'react'
import  EmojiPicker  from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'
import styled from 'styled-components'

const ChatInput = ({ handleSendMsg }) => {

    const [message,setMessage] = useState("")
    const [showEmojiPicker,setShowEmojiPicker] = useState(false)

    const handleEmojiPickerShowHide = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }

    const handleEmojiClick = (event, emoji) => {
        let msg = message;
        msg += emoji.emoji
        setMessage(msg)
    }

    const sendMessage = (e) => {
        e.preventDefault()
        if(message.length > 0) {
            handleSendMsg(message)
            setMessage("")
        }    
    }
  return (
        <InputContainer>
            <div className="button">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerShowHide}/>
                    {/* {
                        showEmojiPicker && 
                        <EmojiPicker />
                    } */}
                </div>
            </div>
            <form className="input-container" onSubmit={(e) => sendMessage(e)}>
                <input type="text" placeholder='Type something' value ={message} onChange={(e)=> {setMessage(e.target.value)}}/>
                <button className="submit"><IoMdSend /></button>
            </form>
        </InputContainer>
    )
}

export default ChatInput

const InputContainer =styled.div`
    flex:0.08;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius:4px;
    padding:5px 10px;
    .button{
        .emoji{
            padding:5px;
            display: flex;
            align-items: center;
            justify-content: center;
            svg{
                font-size:20px;
                cursor: pointer;
                color:#bf54fe;
            }
        }
    }
    .input-container{
        display: flex;
        width: 100%;
        input[type="text"]{
            width: 100%;
            padding:10px;
            border:none;
            outline:none;
            border-radius: 4px;
            margin: 0 10px;
        }
        button{
            padding:10px;
            border:none;
            border-radius:10px;
            background: #bf54ba;
            display:flex;
            align-items: center;
            justify-content: center;
            cursor:pointer;
            svg{
                font-size:20px;
                color:#fff;
            }
        }
    }
`