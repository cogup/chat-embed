import React from "react";
import Theme from "./components/theme/Theme";
import RootStyle from "./RootStyle";
import Layout from "./components/Layout";
import { useConfig } from "./modules/chat/hooks/chat";
import Chat from "./modules/chat/features/Chat";
import { ViewLoader } from "./components/elements/Loader";

function App() {
  const config = useConfig();

  const renderContent = () => {
    if (!config) {
      return <ViewLoader />;
    }

    return <Chat />;
  };

  return (
    <Theme config={config}>
      <RootStyle>
        <Layout>{renderContent()}</Layout>
      </RootStyle>
    </Theme>
  );
}

export default App;
