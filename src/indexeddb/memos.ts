import Dexie from "dexie";
import { memo } from "react";

export interface MemoRecord {
  datetime: string;
  title: string;
  text: string;
}

const database = new Dexie("markdown-editor");
database.version(1).stores({ memos: "&datetime" });

// MemoRecordはデータの型(3行目で定義した型)で、stringはキーとなるデータ(datetime)
const memos: Dexie.Table<MemoRecord, string> = database.table("memos");

export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString();
  await memos.put({ datetime, title, text });
};

const NUM_PER_PAGE: number = 10;

export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count(); // memosテーブルから総件数を取得する。count()はDexieに定義された関数
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE); // totalの件数から1pageあたりの件数で割ってpage数を算出している。
  return pageCount > 0 ? pageCount : 1; // pageCountが0件でも、1pageと判定している。
};

// IndexedDBからテキスト履歴をリストで取得する。戻り値は配列なのでMemoRecord[]というように末尾に[]がついている。
export const getMemos = (page: number): Promise<MemoRecord[]> => {
  // page数を元に、取得する最初の位置を算出
  const offset = (page - 1) * NUM_PER_PAGE;
  // memosテーブルからdataを取得。orderByでdatetimeの昇順で取得、reverseで並び順を逆にする。toArrayで取得したdataを配列に変換して返却している。
  return memos
    .orderBy("datetime")
    .reverse()
    .offset(offset)
    .limit(NUM_PER_PAGE)
    .toArray();
};
