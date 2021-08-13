import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../components/header";
import { getMemoPageCount, getMemos, MemoRecord } from "../indexeddb/memos";

const { useState, useEffect } = React;

// textの更新関数をparameterとして受け取るようにする。
interface Props {
  setText: (text: string) => void;
}

export const History: React.FC<Props> = (props) => {
  const { setText } = props;
  const [memos, setMemos] = useState<MemoRecord[]>([]); // ([])は、usrStateの初期値

  // pagingの設定。現在のページ(page),最大のページ数(maxPage)を管理。
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const history = useHistory();
  // useEffectはrenderingのあとに実行される。
  useEffect(() => {
    getMemos(1).then(setMemos);
    getMemoPageCount().then(setMaxPage); // 第1引数には実行したい関数を入れる(今回はgetMemos())
  }, []); // 第2引数である[]の中身が変更されたら、useEffectの中身(getMemos().then(setMemos);)が実行される。
  // 第2引数を省略すると、rendering(状態が更新される)のたびに実行される。

  // 次ページ、前ページに遷移出来るかどうかを表すフラグ
  const canNextPage: boolean = page < maxPage;
  const canPrevPage: boolean = page > 1;

  // page遷移のボタンをクリックした場合に実行される関数を定義
  const movePage = (targetPage: number) => {
    // 遷移先のpageが遷移可能か判断している。
    if (targetPage < 1 || maxPage < targetPage) {
      return;
    }
    // 遷移可能な場合は、管理されているstateである(page)を更新する
    setPage(targetPage);
    getMemos(targetPage).then(setMemos);
  };
  return (
    <>
      <HeaderArea>
        {/* HeaderComponentに、titleを渡して表示する */}
        <Header title="履歴">
          <Link to="/editor">エディタに戻る</Link>
        </Header>
      </HeaderArea>

      <Wrapper>
        <Paging>
          <PagingButton
            onClick={() => movePage(page - 1)}
            disabled={!canPrevPage}
          >
            ＜
          </PagingButton>
          {page} / {maxPage}
          <PagingButton
            onClick={() => movePage(page + 1)}
            disabled={!canNextPage}
          >
            ＞
          </PagingButton>
        </Paging>
        {/* memosの中にある配列の要素をReactの要素に変換する。 */}
        {/* mapは、配列の要素を関数に渡し、その戻り値から再度配列を生成するメソッド */}
        {memos.map((memo) => (
          <Memo
            key={memo.datetime}
            onClick={() => {
              setText(memo.text); // setTextでその履歴のテキストで更新。
              history.push("/editor"); // editor画面に遷移
            }}
          >
            <MemoTitle>{memo.title}</MemoTitle>
            <MemoText>{memo.text}</MemoText>
          </Memo>
        ))}
      </Wrapper>
    </>
  );
};

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`;

const Wrapper = styled.div`
  bottom: 3rem;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
  overflow: scroll;
`;

const Memo = styled.button`
  display: block;
  background-color: white;
  border: 1px solid gray;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
`;

const MemoTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const MemoText = styled.div`
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Paging = styled.div`
  bottom: 0;
  height: 3rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem;
  position: fixed;
  right: 0;
  text-align: center;
`;

const PagingButton = styled.button`
  background: none;
  border: none;
  display: inline-block;
  height: 2rem;
  padding: 0.5rem 1rem;

  &:disabled {
    color: silver;
  }
`;
