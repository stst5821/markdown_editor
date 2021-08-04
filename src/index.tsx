import * as React from "react";
import { render } from "react-dom";
import styled from "styled-components";

// style

const Header = styled.h1`
  color: red;
`;

const Main = <Header>Markdown Editor</Header>;

// Mainをindex.htmlのid=appの部分に表示する。
render(Main, document.getElementById("app"));
