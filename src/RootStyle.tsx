import styled from "styled-components";
import { t } from "./components/theme/Theme";

export default styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: 300;
  font-size: 1rem;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: ${({ theme }) => t(theme).colorLight.value};
  color: ${({ theme }) => t(theme).colorLight.text};

  ::selection {
    background: ${({ theme }) => t(theme).colorDark.value};
    color: ${({ theme }) => t(theme).colorDark.text};
  }

  @media (max-width: 769px) {
    overflow: hidden;
  }

  transition: background-color 0.3s, color 0.3s !important;
  * {
    transition: background-color 0.3s, color 0.3s !important;
  }
`;
