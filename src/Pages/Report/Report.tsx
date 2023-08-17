import React, { useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import ReportList from './ReportList/ReportList'

function Report() {
  const [currTopic, setCurrTopic] = useState<string>('device_list')
  // const [currDevice, setCurrDevice] = useState<deviceDataType | {}>({})


  return (
    <div className='main_content'>
      <h3 className='top_content'>
        {/* change topic change top content */}
        <span>Thiết bị </span>
        <AiOutlineRight />
        <span className={currTopic === 'device_list' ? 'current' : ''}
          onClick={() => setCurrTopic('device_list')}
          style={{ cursor: 'pointer' }}
        > Báo cáo</span>
        {currTopic !== 'device_list' && <AiOutlineRight />}
        {currTopic === 'device_add' && <span className='current'>Lập báo cáo</span>}
      </h3>
      {/* component */}
      {currTopic === 'device_list' && <ReportList />}
    </div>
  )
}

export default Report
