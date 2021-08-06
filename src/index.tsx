import * as React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { Editor } from "./pages/editor";

// style

const GlobalStyle = createGlobalStyle`
body * {
  box-sizing:border-box;
}
`;

const Main = (
  <>
    <GlobalStyle />
    <Editor />
  </>
);

// Mainをindex.htmlのid=appの部分に表示する。
render(Main, document.getElementById("app"));
