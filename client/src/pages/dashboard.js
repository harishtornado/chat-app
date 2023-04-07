import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const dashboard = () => {

    const appName = "Ulti";
  return (
    <DashboardComponent>
        <LogoSection>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOxRPZGnwIEB4LtHmRUJWeK-hHukVwhmAZsA&usqp=CAU" alt="logo"/>
            <h1>{appName}</h1>
            <h3>Chat with Hearts</h3>
        </LogoSection>
        <DetailSection>
            <div className='welcome__text'>Welcome to {appName}</div>
            <div className='buttons'>
                <Link to="/login">LOG IN</Link>
                <Link to="/signup">SIGN UP</Link>
            </div>
        </DetailSection>
    </DashboardComponent>
  )
}

export default dashboard


const DashboardComponent = styled.div`
    width: 95%;
    height: 90vh;
    background: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow:hidden;
    box-shadow: -2px 6px 10px -6px #000;
    @media screen and (max-width:720px){
        flex-direction: column;
    }
`

const LogoSection = styled.div`
    display: flex;
    flex:0.65;
    height: 100%;
    align-items:center;
    justify-content: center;
    flex-direction: column;
    img{
        height: 200px;
        width: 200px;
        border-radius: 60px;
        border: 10px solid #fff;
    }
    h1{
        font-family: 'Edu NSW ACT Foundation', cursive;
        color: #BF54BA;
        font-size: 48px;
    }
    h3{
        padding: 2px 15px;
        background: #BF54BA;
        border-radius: 20px;
        color: #fff;
        margin-top: 10px;
    }
    @media screen and (max-width:720px){
        flex:0.5;
        img{
            width: 100px;
            height: 100px;
            border-radius: 30px;
        }
        h1{
            font-size: 36px;
        }
        h3{
            font-size:16px;
        }
    }
`
const DetailSection = styled.div`
text-align: center;
    display: flex;
    flex:0.35;
    background:#BF54BA;
    height: 100%;
    box-shadow:inset 0px 0px 15px -5px #fff;
    border: solid 10px #fff;
    border-radius: 20px;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    margin: auto;
    padding: 20px;
    .welcome__text{
        font-size:40px;
        color: #fff;
    }
    .buttons{
        align-items: center;
        width: 100%;
        display: flex;
        flex-direction:column;
        a{
            width: 80%;
            padding: 10px 50px;
            margin-top: 20px;
            text-decoration: none;
            background:#fff;
            text-align: center;
            border-radius: 10px;
            color: #BF54BA;
            font-weight: 700;
            transition: transform 0.5s;
            &:hover{
                transform: scale(0.95);
            }
        }
    }
    @media screen and (max-width:720px){
        flex:0.5;
        width: 100%;
        .welcome__text{
            font-size: 32px;
        }
    }
`