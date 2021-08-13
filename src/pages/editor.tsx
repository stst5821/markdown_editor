import * as React from "react";
import styled from "styled-components";
import { useStateWithStorage } from "../hooks/use_state_with_storage";
import * as ReactMarkdown from "react-markdown";
import { putMemo } from "../indexeddb/memos";
import { Button } from "../components/button";
import { SaveModal } from "../components/save_modal";
import { Header } from "../components/header";
import { Link } from "react-router-dom";

const { useState } = React; // useState関数をReactから取り出す
const StorageKey = "pages/editor:text";

interface Props {
  text: string;
  setText: (text: string) => void;
}

export const Editor: React.FC<Props> = (props) => {
  const { text, setText } = props;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <HeaderArea>
        {/* HeaderComponentを呼び出し。呼び出す際に、titleと、props.children(ButtonとLink)を渡す */}
        <Header title="Markdown Editor">
          {/* ClickしたらsetShowModal関数を呼び出す。呼び出す際にtrueを渡す */}
          <Button onClick={() => setShowModal(true)}>保存する</Button>
          <Link to="/history">履歴を見る</Link>
        </Header>
      </HeaderArea>

      <Wrapper>
        <TextArea
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <Preview>
          <ReactMarkdown>{text}</ReactMarkdown>
        </Preview>
      </Wrapper>
      {showModal && (
        <SaveModal
          onSave={(title: string): void => {
            putMemo(title, text);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  top: 3rem;
  position: fixed;
  right: 0;
`;

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`;

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`;

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`;
