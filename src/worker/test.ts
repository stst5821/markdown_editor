const worker: Worker = self as any; // WebWorkerを変数にsetする as anyはtypescript特有の書き方、anyとすることで型チェックを回避している

// メインスレッドからデータを渡された際に実行する関数を定義する
worker.addEventListener("message", (event) => {
  console.log("Worker Received:", event.data);

  // let count: number = 1;
  // while (count < 1000000000) {
  //   // 最初から大きな値を入れないでください！
  //   count++;
  // }

  worker.postMessage({ result: event.data }); // postMessageという関数を呼び出してメインスレッドへ処理結果を送信。
});
