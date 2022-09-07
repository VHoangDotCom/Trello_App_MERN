import React, { useEffect, useRef, useState, useMemo } from 'react'
import { isEmpty, cloneDeep } from 'lodash'

import './BoardContent.scss'

import { Column } from 'components/Column/Column'

//import { initialData } from 'actions/initialData'
import {
  fetchBoardDetails,
  createNewColumn,
  updateBoard,
  updateColumn
} from 'actions/ApiCall'

import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'

import { Container, Draggable } from 'react-smooth-dnd'
import {
  Container as BootstrapContainer, Row, Col, Form, Button
} from 'react-bootstrap'

export const BoardContent = () => {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState({})
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const newColumnInputRef = useRef(null)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)


  useEffect( () => {
    //const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    const boardId = '6312a58f7fcd7e0cf330a4d8'
    fetchBoardDetails(boardId).then(board => {
      setBoard(board)
      setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
    })
  }, [])

  useEffect( () => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openNewColumnForm])

  if (isEmpty(board)) {
    return <div className='not-found' style={{ 'padding': '10px', 'color': 'white' }}>Board not found...</div>
  }

  const onColumnDrop = (dropResult) => {
    // console.log(dropResult)
    let newColumns = cloneDeep(columns)
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = cloneDeep(board)
    newBoard.columnOrder = newColumns.map(c => c._id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)

    //call api update columnOrder in Board detail
    updateBoard(newBoard._id, newBoard).catch(error => {
      setColumns(columns)
      setBoard(board)
    })
  }

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = cloneDeep(columns)

      let currentColumn = newColumns.find(c => c._id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(i => i._id)

      setColumns(newColumns)
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        //Actions : Move card inside its column
        updateColumn(currentColumn._id, currentColumn).catch(() => setColumns(columns))
      } else {
        //Actions : Move card between 2 columns
        //updateColumn(currentColumn._id, currentColumn).catch(() => setColumns(columns))

        let currentCard = cloneDeep(dropResult.payload)
        currentCard.columnId = currentColumn._id
      }

    }
  }

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }

    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim()
    }

    createNewColumn(newColumnToAdd).then(column => {
      let newColumns = [...columns]
      newColumns.push(column)

      let newBoard = { ...board }
      newBoard.columnOrder = newColumns.map(c => c._id)
      newBoard.columns = newColumns

      setColumns(newColumns)
      setBoard(newBoard)
      setNewColumnTitle('')
      toggleOpenNewColumnForm()
    })

  }

  const onUpdateColumnState = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate._id

    let newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex(i => i._id === columnIdToUpdate)

    if (newColumnToUpdate._destroy) {
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate )
    }

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c._id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  return (
    <div className='board-content'>
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={index => columns[index] }
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumnState={onUpdateColumnState}
            />
          </Draggable>
        ))}
      </Container>

      <BootstrapContainer className='viethoang-trello-container'>
        {!openNewColumnForm &&
         <Row>
           <Col className='add-new-column' onClick={toggleOpenNewColumnForm}>
             <i className='fa fa-plus icon' />  Add another columns
           </Col>
         </Row>
        }

        {openNewColumnForm &&
          <Row>
            <Col className='enter-new-column'>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter column title..."
                className='input-enter-new-column'
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
              />
              <Button variant="success" size='sm' onClick={addNewColumn}>Add Column</Button>
              <span className='cancel-icon' onClick={toggleOpenNewColumnForm}>
                <i className='fa fa-times icon' />
              </span>
            </Col>
          </Row>
        }

      </BootstrapContainer>

    </div>
  )
}
