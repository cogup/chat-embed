import React from "react";
import Theme from "./components/theme/Theme";
import RootStyle from "./RootStyle";
import Layout from "./components/Layout";
import { useChat } from "./modules/chat/hooks/chat";
import Chat from "./modules/chat/features/Chat";
import { ViewLoader } from "./components/elements/Loader";

function App() {
  const chat = useChat();

  const renderContent = () => {
    if (!chat) {
      return <ViewLoader />;
    }

    return <Chat />;
  };

  return (
    <Theme>
      <RootStyle>
        <Layout>{renderContent()}</Layout>
      </RootStyle>
    </Theme>
  );
}

export default App;
