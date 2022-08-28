import React from 'react';
import './BoardContent.scss';

import { Column } from 'components/Column/Column';

export const BoardContent = () => {
  return (
    <div className='board-content'>
       <Column />
       <Column />
     </div>
  )
}
