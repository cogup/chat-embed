import React from "react";
import styled from "styled-components";
import { useQuerystring } from "../core/uses";
import { t } from "./theme/Theme";

const FullScreen = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => t(theme).backgroundSiteColor.value};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 80vh;
  background: ${({ theme }) => t(theme).backgroundChatColor.value};
  border-radius: ${({ theme }) => t(theme).borderRadius};
  padding: 1rem;
  box-shadow: ${({ theme }) => t(theme).boxShadowContainer};
`;

interface LayoutProps {
  children: React.ReactNode;
}

interface Options {
  fs?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const options = useQuerystring<Options>();

  if (options.fs) {
    return <FullScreen>{children}</FullScreen>;
  }

  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default Layout;
