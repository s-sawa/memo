let sArry = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let hArry = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// let cArry = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// let dArry = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let newSArry = [];
let getCard = 0;
let cardNumber1 = 0;
let cardNumber2 = 0;
let countWin = 0;
let countLose = 0;
let countDraw = 0;
let cash = 1000000;
let betAmount = 0;
let winPercentage = 0;
//オーディオ
const audio = new Audio("./music/trump.mp3");
const audioMoney = new Audio("./music/money.mp3");

// スタートボタン
$("#start").on("click", function () {
  // ゲーム画面表示
  $("#container").removeClass("hidden");
  // スタート画面非表示
  $("#start").addClass("hidden");
  $("#start__wrapper").addClass("hidden");
  // ゲーム開始フラグ
  startFlag = 1;
  $("#cash").html(`${cash.toLocaleString()}ポイント`);
  newSArry = sArry.sort(() => Math.random() - 0.5);
  getCard = newSArry.shift();
  cardNumber1 = getCard;
  $("#card-before").attr("src", `./image/s_${getCard}.png`);
});

//掛け金取得
$("#button1").on("click", function () {
  betAmount = $("#input-data").val();
  if (cash >= betAmount) {
    cash = cash - betAmount;
    audioMoney.play();
  } else {
    // alert("お金が足りないよ！");
    Swal.fire({
      icon: "error",
      title: "お金が",
      text: "足りないよ!",
    });
  }
  $("#cash").html(`${cash.toLocaleString()}ポイント`);
});

// タイムスタンプ
// 「yyyymmdd」形式の日付文字列に変換する関数
function formatDateInYyyymmdd(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  const yyyy = y.toString();
  const mm = ("00" + m).slice(-2);
  const dd = ("00" + d).slice(-2);

  return yyyy + mm + dd;
}

// 「hhmmss」形式の時刻文字列に変換する関数
function formatDateInHhmmss(date) {
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();

  const hh = ("00" + h).slice(-2);
  const mm = ("00" + m).slice(-2);
  const ss = ("00" + s).slice(-2);

  return hh + mm + ss;
}
// ゲーム終了チェック

// ゲーム終了チェック
function gameEnd(cash) {
  let value = "";
  //所持金がマイナスの場合
  if (0 >= cash || newSArry.length == 0) {
    if (0 >= cash) {
      value = "lose";

      Swal.fire({
        title: `${cash.toLocaleString()}ポイント借金!!`,
        text: "ギャンブルはやめよう!",
        imageUrl:
          "https://image-select.mamastar.jp/interspace/wp-content/uploads/1602477430-c3b7947dcb7c2eda9bbd2a978d26b2b9-1200x630.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      }).then(() => {
        window.location.reload();
      });

      const date = new Date();
      const yyyymmdd = formatDateInYyyymmdd(date);
      const hhmmss = formatDateInHhmmss(date);
      const timestamp = yyyymmdd + hhmmss;
      localStorage.setItem(timestamp, value);
    }
    if (newSArry.length == 0) {
      value = "win";
      // alert("Win");
      Swal.fire({
        title: `${cash.toLocaleString()}ポイント獲得!`,
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        confirmButtonText: "Restart Game",
        backdrop: `
        rgba(0,0,123,0.4)
        url("./image/funny-celebrate-10.gif") center top no-repeat
        `,
      }).then(() => {
        window.location.reload();
      });

      const date = new Date();
      const yyyymmdd = formatDateInYyyymmdd(date);
      const hhmmss = formatDateInHhmmss(date);
      const timestamp = yyyymmdd + hhmmss;
      localStorage.setItem(timestamp, value);
    }
    $("#container").addClass("hidden");
    $("#start").removeClass("hidden");
    $("#start__wrapper").removeClass("hidden");
    // 画面リロードでスタート画面に戻る
    // window.location.reload();
  }
}

// 勝った時の収支計算
function calcuWin() {
  cash = cash + betAmount * 2;
  $("#cash").html(`${cash.toLocaleString()}ポイント`);
  gameEnd(cash);
}
// 負けた時の収支計算
function calcuLose() {
  cash = cash - betAmount * 2;
  $("#cash").html(`${cash.toLocaleString()}ポイント`);
  gameEnd(cash);
}
// 引き分け時の収支計算
function calcuDraw() {
  cash = cash + betAmount * 0.8;
  $("#cash").html(`${cash.toLocaleString()}ポイント`);
}
// HIGHボタン押下時
$("#high-button").on("click", function () {
  getCard = newSArry.shift();
  $("#card-after").attr("src", `./image/s_${getCard}.png`);
  cardNumber2 = getCard;
  if (cardNumber1 < cardNumber2) {
    countWin++;
    calcuWin();
    $("#count-win").html(`${countWin}回`);
  } else if (cardNumber1 > cardNumber2) {
    countLose++;
    calcuLose();
    $("#count-lose").html(`${countLose}回`);
  } else {
    countDraw++;
    calcuDraw();
    $("#count-draw").html(`${countDraw}回`);
  }

  cardNumber1 = cardNumber2;
  setTimeout(() => {
    $("#card-after").attr("src", "./image/card_reverse.png");
    $("#card-before").attr("src", `./image/s_${getCard}.png`);
  }, 500);
});

// LOWボタン押下時
$("#low-button").on("click", function () {
  getCard = newSArry.shift();
  $("#card-after").attr("src", `./image/s_${getCard}.png`);
  cardNumber2 = getCard;

  if (cardNumber1 > cardNumber2) {
    countWin++;
    calcuWin();
    $("#count-win").html(`${countWin}回`);
  } else if (cardNumber1 < cardNumber2) {
    countLose++;
    calcuLose();
    $("#count-lose").html(`${countLose}回`);
  } else {
    countDraw++;
    calcuDraw();
    $("#count-draw").html(`${countDraw}回`);
  }
  cardNumber1 = cardNumber2;
  setTimeout(() => {
    $("#card-after").attr("src", "./image/card_reverse.png");
    $("#card-before").attr("src", `./image/s_${getCard}.png`);
    // $("#input-data").html("saa ");
  }, 500);
});

// 勝率計算、入力フォームリセット
$("#high-button, #low-button").on("click", function () {
  winPercentage = Math.ceil(
    (countWin / (countWin + countLose + countDraw)) * 100
  );
  $("#win-percentage").html(`${winPercentage}%`);
  // $("#input-data").val("");
});

// 音楽再生
$("#high-button, #low-button").on("click", function () {
  audio.play();
});
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key);
  const value = localStorage.getItem(key);

  const h = "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
  $("#record").append(h);
  $("td").addClass("text-sm font-bold text-white-500 p-2 border");
}

// テーブルのtdがクリックされたときに実行される処理
$("td").on("click", function () {
  const row = $(this).closest("tr"); // クリックされたセルの親要素である行を取得する
  const key = row.find("td:first-child").text(); // 行の最初のセルのテキストをキーとして取得する
  localStorage.removeItem(key); // localStorageからキーに対応するアイテムを削除する
  row.remove(); // テーブルからクリックされた行を削除する
});
