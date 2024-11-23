import styled from "styled-components";
import { t } from "../theme/Theme";
import React from "react";

export enum LoaderType {
  WHITE = "loaderWhite",
  BLACK = "loaderBlack",
}

export interface LoaderProps {
  type?: LoaderType;
  size?: number;
}

const Loader = styled.div<LoaderProps>(({ type, size, theme }) => {
  let animation = "";

  if (type) {
    if (type === LoaderType.WHITE) {
      animation = "loaderWhite";
    } else {
      animation = "loaderBlack";
    }
  } else if (t(theme).darkMode) {
    animation = "loaderBlack";
  } else {
    animation = "loaderWhite";
  }

  const sizeBall = size ? `${size}px` : "15px";

  return `
    border-radius: 50%;
    animation: ${animation} 1s infinite linear alternate;
    cursor: none;
    aspect-ratio: 1;
    user-select: none;
      
    @keyframes loaderBlack {
        0%  {box-shadow: ${sizeBall} 0 #000, -${sizeBall} 0 #0002;background: #000 }
        33% {box-shadow: ${sizeBall} 0 #000, -${sizeBall} 0 #0002;background: #0002}
        66% {box-shadow: ${sizeBall} 0 #0002,-${sizeBall} 0 #000; background: #0002}
        100%{box-shadow: ${sizeBall} 0 #0002,-${sizeBall} 0 #000; background: #000 }
    }

    @keyframes loaderWhite {
        0%  {box-shadow: ${sizeBall} 0 #fff, -${sizeBall} 0 #8d8d8d;background: #fff }
        33% {box-shadow: ${sizeBall} 0 #fff, -${sizeBall} 0 #8d8d8d;background: #8d8d8d}
        66% {box-shadow: ${sizeBall} 0 #8d8d8d,-${sizeBall} 0 #fff; background: #8d8d8d}
        100%{box-shadow: ${sizeBall} 0 #8d8d8d,-${sizeBall} 0 #fff; background: #fff }
    }
  `;
});

export default Loader;

const ViewLoaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const InnerViewLoader = styled(Loader)`
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(0, -50%);
  width: 10px;
`;

export const ViewLoader: React.FC = () => {
  return (
    <ViewLoaderWrapper>
      <InnerViewLoader type={LoaderType.WHITE} size={20} />
    </ViewLoaderWrapper>
  );
};
