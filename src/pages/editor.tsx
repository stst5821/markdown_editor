import * as React from "react";
import styled from "styled-components";
import { useStateWithStorage } from "../hooks/use_state_with_storage";
import { putMemo } from "../indexeddb/memos";
import { Button } from "../components/button";
import { SaveModal } from "../components/save_modal";
import { Header } from "../components/header";
import { Link } from "react-router-dom";
import ConvertMarkdownWorker from "worker-loader!../worker/convert_markdown_worker";
import { setSyntheticLeadingComments } from "typescript";

const convertMarkdownWorker = new ConvertMarkdownWorker();
const { useState, useEffect } = React;

const StorageKey = "pages/editor:text";

interface Props {
  text: string;
  setText: (text: string) => void;
}

export const Editor: React.FC<Props> = (props) => {
  const { text, setText } = props;
  const [showModal, setShowModal] = useState(false);

  // HTMLの文字列を管理するstateを用意。
  const [html, setHtml] = useState("");

  // 初回のみWorkerから結果を受け取る関数を登録している
  useEffect(() => {
    // webworkerから受け取った処理結果(HTML)でstateを更新する
    convertMarkdownWorker.onmessage = (event) => {
      setHtml(event.data.html);
    };
  }, []);

  // テキスト変更時にWorkerへテキストデータを送信しています。
  useEffect(() => {
    convertMarkdownWorker.postMessage(text);
  }, [text]);

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
          {/* HTMLをdivタグ内に表示する */}
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
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
