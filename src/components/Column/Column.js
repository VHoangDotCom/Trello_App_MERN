import React, { useCallback, useEffect, useState, useRef } from 'react'

import './Column.scss'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap'

import { Card } from 'components/Card/Card'
import ConfirmModal from 'components/Common/ComfirmModal'

import { mapOrder } from 'utilities/sorts'
import { saveContentAfterPressEnter, selectAllInlineText } from 'utilities/contentEditable'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utilities/constants'

import { cloneDeep } from 'lodash'

export const Column = (props) => {
  const { column, onCardDrop, onUpdateColumn } = props
  const cards =mapOrder(column.cards, column.cardOrder, '_id')

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  const [columnTitle, setColumnTitle] = useState('')

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleShowConfirmModal()
  }

  const handleColumnTitleChange = useCallback((e) => setColumnTitle(e.target.value), [])

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
  }

  const newCardTextAreaRef = useRef(null)

  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextAreaRef.current.focus()
      return
    }

    const newCardToAdd = {
      id: Math.random().toString(36).substring(2, 5), //5 random charactors
      boardId: column.boardId,
      columnId: column._id,
      title: newCardTitle.trim(),
      cover: null
    }
    let newColumn = cloneDeep(column)
    newColumn.cards.push(newCardToAdd)
    newColumn.cardOrder.push(newCardToAdd._id)

    onUpdateColumn(newColumn)
    setNewCardTitle('')
    toggleOpenNewCardForm()
  }

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  useEffect( () => {
    if (newCardTextAreaRef && newCardTextAreaRef.current) {
      newCardTextAreaRef.current.focus()
      newCardTextAreaRef.current.select()
    }
  }, [openNewCardForm])


  return (
    <div className='column'>
      <header className='column-drag-handle'>
        <div className='column-title'>
          <Form.Control
            size="sm"
            type="text"
            className='viethoang-content-editable'
            value={columnTitle}
            spellCheck="false"
            onClick={selectAllInlineText}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onMouseDown={e => e.preventDefault()}
          />
        </div>
        <div className='column-dropdown-actions'>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size='sm' className='dropdown-btn' />

            <Dropdown.Menu>
              <Dropdown.Item >Add card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>Remove column...</Dropdown.Item>
              <Dropdown.Item >Move all cards in this column...</Dropdown.Item>
              <Dropdown.Item >Archive all cards in this column...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

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
          onDrop={dropResult => onCardDrop(column._id, dropResult) }
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
        {openNewCardForm &&
            <div className='add-new-card-area'>
              <Form.Control
                size="sm"
                as="textarea"
                rows="3"
                placeholder="Enter a title for this card..."
                className='textarea-enter-new-card'
                ref={newCardTextAreaRef}
                value={newCardTitle}
                onChange={onNewCardTitleChange}
                onKeyDown={event => (event.key === 'Enter') && addNewCard()}
              />
            </div>
        }
      </div>
      <footer>
        {openNewCardForm &&
            <div className='add-new-card-actions'>
              <Button variant="success" size='sm' onClick={addNewCard}>Add card</Button>
              <span className='cancel-icon' onClick={toggleOpenNewCardForm}>
                <i className='fa fa-times icon' />
              </span>
            </div>
        }
        {!openNewCardForm &&
        <div className='footer-action' onClick={toggleOpenNewCardForm}>
          <i className='fa fa-plus icon' />  Add another card
        </div>
        }
      </footer>

      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove column"
        content={`Are you sure you want to remove <strong> ${column.title} </strong>?
       </br> All related cards will also be removed!`}
      />
    </div>
  )
}

