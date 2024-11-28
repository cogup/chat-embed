import React, { useState } from "react";
import styled from "styled-components";

// Estilização do wrapper
const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
  right: 20px;
  bottom: 20px;
`;

// Estilização do botão
const ChatButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  z-index: 9999;

  &:hover {
    background-color: #0056b3;
  }
`;

// Estilização do iframe
const ChatIframe = styled.iframe`
  width: 400px;
  height: 600px;
  margin-bottom: 10px;
  border: none;
  z-index: 9999;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const App = () => {
  const [iframeVisible, setIframeVisible] = useState(false);

  const toggleIframe = () => {
    setIframeVisible(!iframeVisible);
  };

  return (
    <Wrapper>
      {iframeVisible && (
        <ChatIframe src="http://01a821bad032.channel.cogup.ai:3002" />
      )}
      <ChatButton onClick={toggleIframe}>
        {iframeVisible ? "X" : "💬"}
      </ChatButton>
    </Wrapper>
  );
};

export default App;
