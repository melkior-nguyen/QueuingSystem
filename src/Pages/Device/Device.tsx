import React, { useState } from 'react'
import './device.css'
import { AiOutlineRight } from 'react-icons/ai'
import DeviceList from './DeviceList/DeviceList'
import { deviceDataType } from '../../type'
import DeviceDetail from './DeviceDetail/DeviceDetail'
import DeviceAdd from './DeviceAdd/DeviceAdd'
import DeviceUpdate from './DeviceUpdate/DeviceUpdate'

function Device() {
  const [currTopic, setCurrTopic] = useState<string>('device_list')
  const [currDevice, setCurrDevice] = useState<deviceDataType | {}>({})
  const [currIndex, setCurrIndex] = useState<number>(0)


  return (
    <div className='main_content'>
      <h3 className='top_content'>
        {/* change topic change top content */}
        <span>Thiết bị </span>
        <AiOutlineRight />
        <span className={currTopic === 'device_list' ? 'current' : ''}
          onClick={() => setCurrTopic('device_list')}
          style={{ cursor: 'pointer' }}
        > Danh sách thiết bị</span>
        {currTopic !== 'device_list' && <AiOutlineRight />}
        {currTopic === 'device_add' && <span className='current'> Thêm thiết bị</span>}
        {currTopic === 'device_detail' && <span className='current'> Chi tiết thiết bị</span>}
        {currTopic === 'device_update' && <span className='current'> Cập nhật thiết bị</span>}
      </h3>
      {/* component */}
      {currTopic === 'device_list' && <DeviceList setCurrTopic={setCurrTopic} setCurrDevice={setCurrDevice} setCurrIndex={setCurrIndex}/>}
      {currTopic === 'device_detail' && <DeviceDetail currDevice={currDevice} setCurrTopic={setCurrTopic}/>}
      {currTopic === 'device_update' && <DeviceUpdate setCurrTopic={setCurrTopic} currDevice={currDevice} currIndex={currIndex}/>}
      {currTopic === 'device_add' && <DeviceAdd setCurrTopic={setCurrTopic} />}
    </div>
  )
}

export default Device
