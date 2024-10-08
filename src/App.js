import { useEffect, useState } from 'react'
import './App.css'
import { getAllPokemon, getPokemon } from './utils/pokemon.js'
import Card from './components/Card/Card'
import NavBar from './components/NavBar/NavBar'

function App() {
  /**
   * 変数
   */
  //ポケモンapiへのリクエストパス
  const initialURL = 'https://pokeapi.co/api/v2/pokemon/'

  /**
   * 状態変数
   */
  //データ読み込み中のローディング状態(初期値true)
  const [loading, setLoading] = useState(true)

  const [pokemonData, setPokemonData] = useState([])

  const [prevUrl, setPrevUrl] = useState('')

  const [nextUrl, setNextUrl] = useState('')

  /**
   * hooks
   */
  //第2引数で発火させるタイミングを指定ができる(空配列を渡すとマウント時に発火)
  //マウント時を指定した場合、<React.StrictMod>タグを設置している場合は開発モードでは2回呼ばれる
  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL)
      //各ポケモンの詳細データ取得
      loadPokemon(res.results)
      console.log(res.next)

      //次の20件取得用urlセット
      setNextUrl(res.next)

      //前の20件取得用urlセット
      setPrevUrl(res.previous)

      //データ読み込み完了
      setLoading(false)
    }
    fetchPokemonData()
  }, [])

  /**
   * 関数
   */
  const loadPokemon = async (data) => {
    //引数で受け取った各ポケモンデータ分のfetchが終わるまで処理を待つためPromise.allを使っている
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon)
        let pokemonRecord = getPokemon(pokemon.url)
        return pokemonRecord
      })
    )
    setPokemonData(_pokemonData)
  }

  const handlePrevPage = async () => {
    if (!prevUrl) return //1ページ目はnullになるため処理をさせない
    setLoading(true)
    let data = await getAllPokemon(prevUrl)
    // console.log(data)
    await loadPokemon(data.results)
    //次の20件取得用urlセット
    setNextUrl(data.next)
    //前の20件取得用urlセット
    setPrevUrl(data.previous)

    setLoading(false)
  }

  const handleNextPage = async () => {
    setLoading(true)
    let data = await getAllPokemon(nextUrl)
    // console.log(data)
    await loadPokemon(data.results)
    //次の20件取得用urlセット
    setNextUrl(data.next)
    //前の20件取得用urlセット
    setPrevUrl(data.previous)

    setLoading(false)
  }

  return (
    <>
      <NavBar />
      <div className='App'>
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          //コメント
          <>
            <div className='pokemonCardContainer'>
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>
            <div className='btn'>
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default App
