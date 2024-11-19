import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { useMessagesListener } from "../../message/hooks/message";
import MessageItem from "./MessageItem";
import __, { Index } from "../../../settings/i18n";
import { useListenerAction } from "../../../core/listeners";
import { listMessages } from "../../message/entities/message";

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

const EmptyMessages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export interface MessagesContainerListenerProps {
  displayEmptyMessage?: boolean;
  autoScrollOff?: boolean;
}

const MessagesContainerListener: React.FC<MessagesContainerListenerProps> = ({
  displayEmptyMessage,
  autoScrollOff,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const messages = useMessagesListener();
  const [totalMessages, setTotalMessages] = React.useState(0);
  const messageLoaded = useListenerAction(listMessages.fulfilled);

  const renderMessages = useCallback((): ReactNode => {
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
    if (!autoScrollOff && divRef.current) {
      divRef.current.scrollTo({
        top: divRef.current.scrollHeight + 1000,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setTotalMessages(messages.length ?? 0);
  }, [messages]);

  useEffect(() => {
    setTimeout(scrollToBottom, 300);
  }, [totalMessages]);

  if (messageLoaded && !messages.length && displayEmptyMessage) {
    return <EmptyMessages>{__(Index.NO_MESSAGES)}</EmptyMessages>;
  }

  return <ChatMessages ref={divRef}>{renderMessages()}</ChatMessages>;
};

export default MessagesContainerListener;
