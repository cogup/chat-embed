import React from "react";
import styled from "styled-components";
import ChatTextarea from "./ChatTextarea";
import MessagesContainerListener, {
  MessagesContainerListenerProps,
} from "./MessagesContainerListener";
import { useAppSelector } from "../../../core/hooks";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const ChatInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export interface ChatProps extends MessagesContainerListenerProps {
  textarea?: boolean;
}

const Chat: React.FC<ChatProps> = ({ textarea = true, ...props }) => {
  const messageError = useAppSelector((state) => state.messageEntity.error);

  if (messageError) {
    return (
      <ChatContainer>
        <ChatInfo>{messageError}</ChatInfo>
      </ChatContainer>
    );
  }

  return (
    <ChatContainer>
      <MessagesContainerListener {...props} />
      <ChatTextarea />
    </ChatContainer>
  );
};

export default Chat;
