import * as marked from "marked"; // markdownファイルをhtmlに変換するライブラリ、markedをimport
import * as sanitizeHtml from "sanitize-html";
const worker: Worker = self as any; // WebWorkerを変数にsetする as anyはtypescript特有の書き方、anyとすることで型チェックを回避している

// メインスレッドからデータを渡された際に実行する関数を定義する
worker.addEventListener("message", (event) => {
  // markdown形式のテキストデータをmarkedでHTMLに変換し、メインスレッドに結果のHTMLを返却している
  const text = event.data;
  const html = sanitizeHtml(marked(text), {
    // サニタイズされたhtmlを出力する。...はスプレッド構文。sanitize-htmlではh1,h2がデフォルトで除外されているため追加している。
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "h1", "h2"],
  });
  worker.postMessage({ html });
});
