import React from 'react'
import styled from 'styled-components'

const Messages = () => {
  return (
    <MessageContainer>

    </MessageContainer>
  )
}

export default Messages

const MessageContainer = styled.div`
    flex:0.78;
    background: url();
    border-radius:4px;
    border: 2px solid #bf54ba;
    overflow: scroll;
    ::-webkit-scrollbar{
        display: none;
    }
`