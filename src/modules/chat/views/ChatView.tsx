import React from "react";
import { useChat } from "../hooks/chat";
import Chat from "../features/Chat";

const ChatView: React.FC = () => {
  const chat = useChat();

  return <Chat loading={!!chat} />;
};

export default ChatView;
