import React from "react";
import styled from "styled-components";
import { t } from "../../../components/theme/Theme";
import { MessageOwners, MessageStatus } from "../../message/interfaces";
import { DateTime } from "luxon";
import { LuCheck, LuCheckCheck } from "react-icons/lu";

const IconNoCheck = styled(LuCheck)`
  font-size: 0.8rem;
  color: ${({ theme }) => t(theme).colors.success.value};
`;

const IconCheck = styled(LuCheckCheck)`
  font-size: 0.8rem;
  color: ${({ theme }) => t(theme).colors.success.value};
`;

const FooterDateUser = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${({ theme }) => t(theme).colors.secondary.text};
`;

const FooterDateOther = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${({ theme }) => t(theme).colors.primary.text};
`;

const FooterStatus = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 0.5rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  font-size: 0.7rem;
`;

interface FooterProps {
  date?: DateTime;
  status?: MessageStatus;
  owner: MessageOwners;
}

const FooterInfo: React.FC<FooterProps> = ({ date, status, owner }) => {
  const getIconStatus = () => {
    if (!status) return null;

    switch (status) {
      case MessageStatus.COMPLETED:
        return <IconCheck />;
      default:
        return <IconNoCheck />;
    }
  };

  const renderStatus = () => {
    if (!status) return null;

    return <FooterStatus>{getIconStatus()}</FooterStatus>;
  };

  const renderDate = () => {
    switch (owner) {
      case MessageOwners.USER:
        return (
          <FooterDateUser>
            {date?.toLocaleString(DateTime.TIME_SIMPLE)}
          </FooterDateUser>
        );
      default:
        return (
          <FooterDateOther>
            {date?.toLocaleString(DateTime.TIME_SIMPLE)}
          </FooterDateOther>
        );
    }
  };

  return (
    <Footer>
      {renderDate()}
      {renderStatus()}
    </Footer>
  );
};

export default FooterInfo;
