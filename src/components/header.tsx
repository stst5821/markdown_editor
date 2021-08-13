import * as React from "react";
import styled from "styled-components";

// editor.tsxから呼び出された際の型を決める
interface Props {
  title: string;
  children: React.ReactNode; // オペレーション要素を受け取れるようにする。React.ReactNodeはReactがjsx内で扱える要素の型。
}

export const Header: React.FC<Props> = (props) => (
  <HeaderWrapper>
    {/* editor.tsx,history.tsxから渡されたtitleを受けて表示 */}
    <HeaderTitle>{props.title}</HeaderTitle>
    <HeaderControl>{props.children}</HeaderControl>
  </HeaderWrapper>
);

const HeaderWrapper = styled.header`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: space-between;
  line-height: 2rem;
  padding: 0.5rem 1rem;
`;

const HeaderTitle = styled.div`
  font-size: 1.5rem;
`;

const HeaderControl = styled.div`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: center;

  & > * {
    margin-left: 0.5rem;
  }
`;
