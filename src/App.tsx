import React from "react";
import Theme from "./components/theme/Theme";
import ChatView from "./modules/chat/views/ChatView";
import RootStyle from "./RootStyle";

function App() {
  return (
    <Theme>
      <RootStyle>
        <ChatView />
      </RootStyle>
    </Theme>
  );
}

export default App;
