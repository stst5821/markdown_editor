import * as marked from "marked"; // markdownファイルをhtmlに変換するライブラリ、markedをimport

const worker: Worker = self as any; // WebWorkerを変数にsetする as anyはtypescript特有の書き方、anyとすることで型チェックを回避している

// メインスレッドからデータを渡された際に実行する関数を定義する
worker.addEventListener("message", (event) => {
  // markdown形式のテキストデータをmarkedでHTMLに変換し、メインスレッドに結果のHTMLを返却している
  const text = event.data;
  const html = marked(text);
  worker.postMessage({ html });
});
