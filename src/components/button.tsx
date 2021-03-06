import * as React from "react";
import styled from "styled-components";

// componentに渡すパラメーターの型を定義する
interface Props {
  cancel?: boolean;
  children: string;
  onClick: () => void;
}

// <Props>とすることによって、引数のpropsは、Props型であると定義できる。
export const Button: React.FC<Props> = (props) => (
  <StyledButton
    onClick={props.onClick}
    className={props.cancel ? "cancel" : ""}
  >
    {props.children}
  </StyledButton>
);

const StyledButton = styled.button`
  background-color: dodgerblue;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;
  &.cancel {
    background: white;
    border: 1px solid gray;
    color: gray;
  }
`;
