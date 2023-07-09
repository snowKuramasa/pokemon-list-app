export const getAllPokemon = (url) => {
  return new Promise((resolve, reject )=> {
    //リクエストが変えるまで待った後に以下実行
    fetch(url) //urlにリクエストする
    .then((res) => res.json()) //レスポンスをjsonにする
    .then((data) => resolve(data)); //resolve関数の引数にjsonデータを入れて返す
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject )=> {
    //リクエストが変えるまで待った後に以下実行
    fetch(url) //urlにリクエストする
    .then((res) => res.json()) //レスポンスをjsonにする
    .then((data) => {
      // console.log(data)
      resolve(data)}); //resolve関数の引数にjsonデータを入れて返す
  });
};
