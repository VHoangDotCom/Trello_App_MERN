import React from 'react'

import './Column.scss'

import { Card } from 'components/Card/Card'

import { mapOrder } from 'utilities/sorts'

import { Container, Draggable } from 'react-smooth-dnd'

export const Column = (props) => {
  const { column, onCardDrop } = props
  const cards =mapOrder(column.cards, column.cardOrder, 'id')

  return (
    <div className='column'>
      <header className='column-drag-handle'>
        {column.title}
      </header>
      <div className='card-list'>
        <Container
          // onDragStart={e => console.log('drag started', e)}
          // onDragEnd={e => console.log('drag end', e)}
          // onDragEnter={() => {
          //   console.log('drag enter:', column.id);
          // }}
          // onDragLeave={() => {
          //   console.log('drag leave:', column.id);
          // }}
          // onDropReady={p => console.log('Drop ready: ', p)}
          groupName="viethoang-columns"
          onDrop={dropResult => onCardDrop(column.id, dropResult) }
          getChildPayload={index => cards[index] }
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}

        </Container>
      </div>
      <footer>
        <div className='footer-action'>
          <i className='fa fa-plus icon' />  Add another card
        </div>
      </footer>
    </div>
  )
}
