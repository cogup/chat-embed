import React, { useEffect, useState } from "react";
import Theme from "./components/theme/Theme";
import RootStyle from "./RootStyle";
import Layout from "./components/Layout";
import { useConfig } from "./modules/chat/hooks/chat";
import Chat from "./modules/chat/features/Chat";
import { ViewLoader } from "./components/elements/Loader";
import lighter from "./settings/themes/lighter";
import darker from "./settings/themes/darker";
import { mergeTheme } from "./components/theme/utils";

function App() {
  const config = useConfig();
  const [themeDarker, setThemeDarker] = useState(darker);
  const [themeLighter, setThemeLighter] = useState(lighter);

  const renderContent = () => {
    if (!config) {
      return <ViewLoader />;
    }

    return <Chat />;
  };

  useEffect(() => {
    if (config) {
      console.log({ config });
      setThemeDarker((theme) => mergeTheme(config, theme));
      setThemeLighter((theme) => mergeTheme(config, theme));
    }
  }, [config]);
  console.log(themeDarker);
  return (
    <Theme lighter={themeLighter} darker={themeDarker}>
      <RootStyle>
        <Layout>{renderContent()}</Layout>
      </RootStyle>
    </Theme>
  );
}

export default App;
