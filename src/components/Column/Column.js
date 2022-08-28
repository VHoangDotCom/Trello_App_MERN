import React from 'react';

import './Column.scss';

import { Task } from 'components/Task/Task';

export const Column = () => {
  return (
    <div className='column'>
      <header>
          Brainstorm
        </header>
        <ul className='task-list'>
            <Task />
         
          <li className='task-item'>Add what you're like to work on below</li>
          <li className='task-item'>Add what you're like to work on below</li>
        </ul>
        <footer>Add another card</footer>
      </div>
  )
}
