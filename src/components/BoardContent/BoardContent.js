import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

import './BoardContent.scss';

import { Column } from 'components/Column/Column';

import { initialData } from 'actions/initialData';

import { mapOrder } from 'utilities/sorts';

export const BoardContent = () => {
const [board, setBoard] = useState({})
const [columns, setColumns] = useState({})

useEffect( () => {
  const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
  if (boardFromDB){
    setBoard(boardFromDB)

    //sort columns
    setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
  }
}, [])

if(isEmpty(board)){
  return <div className='not-found' style={{'padding': '10px', 'color': 'white'}}>Board not found...</div>
}

  return (
    <div className='board-content'>
      {columns.map((column, index) => <Column key={index} column={column}/>)}
     
     </div>
  )
}
