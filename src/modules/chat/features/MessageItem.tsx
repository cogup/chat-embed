import React from "react";
import Loader, { LoaderType } from "../../../components/elements/Loader";
import styled from "styled-components";
import { t } from "../../../components/theme/Theme";
import Markdown from "react-markdown";
import { MessageOwners, MessageStatus } from "../../message/interfaces";
import { DateTime } from "luxon";
import FooterInfo from "./FooterInfo";
import { motion } from "framer-motion";

const ChatMessageWrapper = styled.div`
  padding: 1rem 0.8rem 0.3rem 0.8rem;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
`;

const ChatMessageUser = styled(ChatMessageWrapper)`
  background-color: ${({ theme }) => t(theme).colors.secondary.value};
  border-radius: ${({ theme }) =>
    `${t(theme).defaultStyles.borderRadius} 0px ${
      t(theme).defaultStyles.borderRadius
    } ${t(theme).defaultStyles.borderRadius}`};
  color: ${({ theme }) => t(theme).colors.secondary.text};
`;

const ChatMessageAssistant = styled(ChatMessageWrapper)`
  background-color: ${({ theme }) => t(theme).colors.primary.value};
  border-radius: ${({ theme }) =>
    `0px ${t(theme).defaultStyles.borderRadius} ${
      t(theme).defaultStyles.borderRadius
    } ${t(theme).defaultStyles.borderRadius}`};
  color: ${({ theme }) => t(theme).colors.primary.text};
  position: relative;
  min-width: 4rem;
`;

const ChatMessageSystem = styled(ChatMessageWrapper)`
  background-color: ${({ theme }) => t(theme).colors.warning.value};
  color: ${({ theme }) => t(theme).colors.warning.text};
  margin-left: 2rem;
`;

const ChatMessageBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
  height: auto;
  user-select: text;
`;

const ChatMessageBoxLeft = styled(ChatMessageBox)`
  align-items: flex-start;
`;

const ChatMessageBoxRight = styled(ChatMessageBox)`
  align-items: end;
`;

const MarkdownFix = styled(Markdown)`
  display: flex;
  flex-direction: column;
  width: 100%;
  word-wrap: break-word;
  align-items: flex-start;

  p {
    margin: 0;

    & + p {
      margin-top: 0.8rem;
    }
  }

  a {
    color: ${({ theme }) => t(theme).colors.primary.text};
    text-decoration: underline;
  }
`;

const loaderStyle = {
  position: "absolute",
  right: "50%",
  top: "50%",
  transform: "translate(0, -50%)",
  width: "4px",
} as React.CSSProperties;

export interface MessageItemProps {
  owner: MessageOwners;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

const animate = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

const MessageItem: React.FC<MessageItemProps> = ({
  owner,
  message,
  status,
  createdAt,
}) => {
  const date = DateTime.fromISO(createdAt);

  if (
    owner !== MessageOwners.USER &&
    (status === MessageStatus.AWAIT || status === MessageStatus.PENDING)
  ) {
    return (
      <ChatMessageBoxLeft {...animate}>
        <ChatMessageAssistant>
          <Loader style={loaderStyle} type={LoaderType.WHITE} size={10} />
        </ChatMessageAssistant>
      </ChatMessageBoxLeft>
    );
  }

  switch (owner) {
    case MessageOwners.USER:
      return (
        <ChatMessageBoxRight>
          <ChatMessageUser>
            <MarkdownFix>{message}</MarkdownFix>
            <FooterInfo date={date} status={status} owner={owner} />
          </ChatMessageUser>
        </ChatMessageBoxRight>
      );
    case MessageOwners.ASSISTANT:
      return (
        <ChatMessageBoxLeft {...animate}>
          <ChatMessageAssistant>
            <MarkdownFix>{message}</MarkdownFix>
            <FooterInfo date={date} owner={owner} />
          </ChatMessageAssistant>
        </ChatMessageBoxLeft>
      );
    case MessageOwners.SYSTEM:
      return (
        <ChatMessageSystem {...animate}>
          <MarkdownFix>{message}</MarkdownFix>
          <FooterInfo date={date} owner={owner} />
        </ChatMessageSystem>
      );
  }

  return null;
};

export default MessageItem;
