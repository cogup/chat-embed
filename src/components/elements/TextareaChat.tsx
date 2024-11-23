import React, { CSSProperties, useEffect, useState } from "react";
import { IoMdArrowRoundUp } from "react-icons/io";
import { ColorType } from "../theme/utils";
import styled from "styled-components";
import { t } from "../theme/Theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: fex;
  align-items: flex-end;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  box-sizing: border-box;
  border: none;
  box-shadow: ${({ theme }) => t(theme).inputBoxShadow};
  width: 100%;
  margin: 0.1rem;
  overflow: auto;
  background-color: ${({ theme }) => t(theme).inputBackgroundColor};
  max-height: 150px;
  border-radius: ${({ theme }) => t(theme).inputBorderRadius};
  border: 1px solid ${({ theme }) => t(theme).inputColorBorder.value};
`;

interface TextareaUIProps {
  $fullHeight?: boolean;
}

const TextareaUI = styled.textarea<TextareaUIProps>`
  border: none;
  width: 100%;
  box-sizing: border-box;
  resize: none;
  font-family: inherit;
  color: ${({ theme }) => t(theme).inputColor};
  white-space: pre-wrap;
  background-color: transparent;
  overflow: hidden;
  outline: none;
  overflow-y: auto;
  max-height: 100%;
  align-self: center;
`;

const TextareaButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  user-select: none;
  text-align: center;
  box-sizing: border-box;
  transition: background-color 0.5s, color 0.5s;
  font-size: 19px;
  margin-left: 0.5rem;
  width: 40px !important;
  min-width: 40px !important;
  min-height: 40px !important;
  height: 40px !important;
  padding: 0;
  background-color: ${({ theme }) => t(theme).buttonSendColor.value};
  color: ${({ theme }) => t(theme).buttonSendColor.text};
  border-radius: ${({ theme }) => t(theme).buttonSendBorderRadius};
`;

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  style?: CSSProperties;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
  buttonSender?: boolean;
  autoRows?: boolean;
  enterClear?: boolean;
  onClickSendButton?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  autoFocus?: boolean;
  $fullHeight?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  autoRows,
  buttonSender,
  onKeyDown,
  onChange,
  defaultValue,
  enterClear,
  onClickSendButton,
  autoFocus,
  $fullHeight: fullHeight,
  ...rest
}) => {
  const [value, setValue] = useState(defaultValue ?? "");
  const [rows, setRows] = useState<number>(1);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (enterClear && event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      setValue("");

      if (autoRows) {
        setRows(1);
      }
    } else if (event.key === "Enter" && event.shiftKey && autoRows) {
      setRows(rows + 1);
      return;
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const onClickSendButtonLocal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (onClickSendButton) {
      setValue("");

      if (autoRows) {
        setRows(1);
      }

      onClickSendButton(event);
    }
  };

  const countLineBreaks = () => {
    if (!textAreaRef.current) {
      return 0;
    }

    const text = textAreaRef.current.value;
    const width = textAreaRef.current.clientWidth;
    const context = document.createElement("canvas").getContext("2d");

    if (context === null) {
      return 0;
    }

    context.font = getComputedStyle(textAreaRef.current).font;

    let lineBreaksCount = 0;
    let currentLine = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      currentLine += char;

      if (char === "\n" || context.measureText(currentLine).width > width) {
        lineBreaksCount++;
        currentLine = char === "\n" ? "" : char;
      }
    }

    if (currentLine.length > 0) {
      lineBreaksCount++;
    }

    return lineBreaksCount;
  };

  const handlerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);

    if (autoRows) {
      const breakLines = countLineBreaks();

      if (breakLines > rows) {
        setRows(breakLines + 1);
      }
    }

    if (onChange) {
      onChange(event);
    }
  };

  const renderButtonSender = () => {
    if (buttonSender) {
      return (
        <TextareaButton
          color={ColorType.LIGHT}
          onClick={onClickSendButtonLocal}
        >
          <IoMdArrowRoundUp />
        </TextareaButton>
      );
    }
  };

  const getTextareaCols = () => {
    return value
      .split("\n")
      .reduce((acc, line) => Math.max(acc, line.length), 0);
  };

  useEffect(() => {
    if (autoFocus && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [textAreaRef, autoFocus]);

  return (
    <Wrapper>
      <TextareaUI
        $fullHeight={fullHeight}
        ref={textAreaRef}
        cols={getTextareaCols()}
        {...rest}
        rows={rows}
        value={value}
        onChange={handlerChange}
        onKeyDown={handleKeyPress}
      />
      {renderButtonSender()}
    </Wrapper>
  );
};

export default Textarea;
