import React from 'react'

import './Card.scss'

export const Card = (props) => {
  const { card } = props
  return (
    <div className='card-item'>
      {card.cover &&
      <img src={card.cover} className='card-cover'
        alt="viethoang"
        onMouseDown={e => e.preventDefault()}>

      </img>}
      {card.title}
    </div>
  )
}
