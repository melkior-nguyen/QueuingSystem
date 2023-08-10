import React, { useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { serviceDataType } from '../../type'
import ServiceList from './ServiceList/ServiceList'
import ServiceDetail from './ServiceDetail/ServiceDetail'
import ServiceUpdate from './ServiceUpdate/ServiceUpdate'
import ServiceAdd from './ServiceAdd/ServiceAdd'

function Service() {
  const [currTopic, setCurrTopic] = useState<string>('service_list')
  const [currservice, setCurrservice] = useState<serviceDataType | {}>({})


  return (
    <div className='main_content'>
      <h3 className='top_content'>
        {/* change topic change top content */}
        <span>Thiết bị </span>
        <AiOutlineRight />
        <span className={currTopic === 'service_list' ? 'current' : ''}
          onClick={() => setCurrTopic('service_list')}
          style={{ cursor: 'pointer' }}
        > Danh sách dịch vụ</span>
        {currTopic !== 'service_list' && <AiOutlineRight />}
        {currTopic === 'service_add' && <span className='current'> Thêm dịch vụ</span>}
        {currTopic === 'service_detail' && <span className='current'> Chi tiết dịch vụ</span>}
        {currTopic === 'service_update' && <span className='current'> Cập nhật dịch vụ</span>}
      </h3>
      {/* component */}
      {currTopic === 'service_list' && <ServiceList setCurrTopic={setCurrTopic} setCurrService={setCurrservice} />}
      {currTopic === 'service_detail' && <ServiceDetail currservice={currservice} setCurrTopic={setCurrTopic}/>}
      {currTopic === 'service_update' && <ServiceUpdate setCurrTopic={setCurrTopic} currservice={currservice} />}
      {currTopic === 'service_add' && <ServiceAdd setCurrTopic={setCurrTopic} />}
    </div>
  )
}

export default Service
