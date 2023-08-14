import React, { useState } from 'react'
import './prog.css'
import { AiOutlineRight } from 'react-icons/ai'
import ProgList from './ProgList/ProgList'
import { customerDataType } from '../../type'
import ProgDetail from './ProgDetail/ProgDetail'
import ProgAdd from './ProgAdd/ProgAdd'

function Progression() {
  const [currTopic, setCurrTopic] = useState<string>('prog_list')
  const [currProg, setCurrProg] = useState<customerDataType | {}>({})



  return (
    <div className='main_content'>
      <h3 className='top_content'>
        {/* change topic change top content */}
        <span>Cấp số</span>
        <AiOutlineRight />
        <span className={currTopic === 'prog_list' ? 'current' : ''}
          onClick={() => setCurrTopic('prog_list')}
          style={{ cursor: 'pointer' }}
        > Danh sách cấp số</span>
        {currTopic !== 'prog_list' && <AiOutlineRight />}
        {currTopic === 'prog_add' && <span className='current'> Cấp số mới</span>}
        {currTopic === 'prog_detail' && <span className='current'> Chi tiết</span>}
      </h3>
      {/* component */}
      {currTopic === 'prog_list' && <ProgList setCurrTopic={setCurrTopic} setCurrProg={setCurrProg} />}
      {currTopic === 'prog_detail' && <ProgDetail currProg={currProg} setCurrTopic={setCurrTopic}/>}
      {currTopic === 'prog_add' && <ProgAdd setCurrTopic={setCurrTopic} />}
    </div>
  )
}

export default Progression
