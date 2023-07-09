import React from 'react';
import "./Card.css";

//★html内でmap関数使うしかないのか？？
//★描画と分けたい

const Card = ({pokemon}) => {
  return (
    <div className='card'>
      <div className='cardImg'>
        <img src={pokemon.sprites.front_default} alt=''/>
      </div>
      <h3 className='cardName'>{pokemon.name}</h3>
      <div className='catdTypes'>
        <div>タイプ</div>
        {
          pokemon.types.map((typeArray) => {
            return (
            <div key={typeArray.type.name}>
              <span className='typeName'>{typeArray.type.name}</span>
            </div>
          )})
        }
      </div>
      <div className='cardInfo'>
        <div className='cardData'>
          <p className='title'>重さ：{pokemon.weight}</p>
        </div>
        <div className='cardData'>
          <p className='title'>高さ：{pokemon.height}</p>
        </div>
        <div className='cardData'>
          <p className='title'>アビリティ：{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Card