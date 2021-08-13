import * as React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Editor } from "./pages/editor";
import { History } from "./pages/history";
import { useStateWithStorage } from "./hooks/use_state_with_storage";

const StorageKey = "/editor:text";

// useStateを使うため、Mainを関数化している
const Main: React.FC = () => {
  const [text, setText] = useStateWithStorage("", StorageKey);
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          {/* index.html上で、editorComonentとhistoryComponentを出し分けている*/}
          <Route exact path="/editor">
            <Editor text={text} setText={setText} />
          </Route>
          <Route exact path="/history">
            <History setText={setText} />
          </Route>
          <Redirect to="/editor" path="*" />
        </Switch>
      </Router>
    </>
  );
};

// style

const GlobalStyle = createGlobalStyle`
body * {
  box-sizing:border-box;
}
`;

// Mainをindex.htmlのid=appの部分に表示する。
render(<Main />, document.getElementById("app"));
