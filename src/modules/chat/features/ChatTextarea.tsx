import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../core/store";
import { createLocalMessage } from "../../message/entities/message";
import TextareaChat from "../../../components/elements/TextareaChat";
import { useMediaQuery } from "../../../components/theme/utils";

const ChatInputArea = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  user-select: none;
  border-radius: 50px;
  padding: 0 0.2rem 0.5rem 0.2rem;
`;

const ChatTextarea = () => {
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const isNotMobile = useMediaQuery("(min-width: 769px)");

  const handleSend = async () => {
    if (inputText.trim() !== "") {
      dispatch(createLocalMessage(inputText));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isNotMobile && e.key === "Enter") {
      handleSend();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <ChatInputArea>
      <TextareaChat
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClickSendButton={handleSend}
        buttonSender
        autoRows
        enterClear={isNotMobile}
      />
    </ChatInputArea>
  );
};

export default ChatTextarea;
