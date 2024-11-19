import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { useMessages } from "../../message/hooks/message";
import MessageItem from "./MessageItem";

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 1rem;
  box-sizing: border-box;
`;

const MessagesContainer = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const messages = useMessages();
  const [totalMessages, setTotalMessages] = React.useState(0);

  const renderMessages = useCallback((): ReactNode => {
    if (!messages) {
      return [];
    }

    return messages.map((message, index) => (
      <MessageItem
        key={index}
        owner={message.owner}
        message={message.message}
        status={message.status}
        createdAt={message.createdAt}
      />
    ));
  }, [messages]);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTo({
        top: divRef.current.scrollHeight + 1000,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setTotalMessages(messages?.length ?? 0);
  }, [messages]);

  useEffect(() => {
    setTimeout(scrollToBottom, 300);
  }, [totalMessages]);

  return <ChatMessages ref={divRef}>{renderMessages()}</ChatMessages>;
};

export default MessagesContainer;
