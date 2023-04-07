import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BiPaperPlane, BiPowerOff } from "react-icons/bi"
import styled from 'styled-components'

const Logout = () => {

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
    <Button onClick={handleLogout}><BiPowerOff /></Button>
  )
}

export default Logout

const Button = styled.button`
  display: flex;
  align-items:center;
  justify-content: center;
  padding: 10px;
  border-radius: 100%;
  background: fff;
  border: none;
  cursor: pointer;
  svg{
    color: #bf54ba;
    font-size: 16px;
  }

`