import React from 'react'
import './dashboard.css'
import { Label, Tag } from '../../Components'
//icons
import { BsCalendar, BsCalendarCheck, BsFillBookmarkStarFill } from 'react-icons/bs'
import { PiUserPlusBold } from 'react-icons/pi'
import { TbDeviceDesktop } from 'react-icons/tb'
import { IoChatbubblesOutline } from 'react-icons/io5'
import { GoStack } from 'react-icons/go'
//component
import Chart from './Chart/Chart'
import { Calendar } from 'antd'

function Dashboard() {
  return (
    <div className='main_content dashboard'>
      <h3>Dashboard</h3>
      <div className="dashboard_chart-wrap">
        <h3 className='content_title'>Biểu đồ cấp số</h3>
        <div className="dashboard_chart-detail">
          <Tag name='Số thứ tự đã cấp'
            icon={<BsCalendar />} quantity={4221}
            percent='32.41%' percentType='up'
            color='#6695FB' backgroundColor=' #6695FB26'
          />
          <Tag name='Số thứ tự đã cấp'
            icon={<BsCalendarCheck />} quantity={3721}
            percent='32.41%' percentType='down'
            color='#35C75A' backgroundColor=' #35C75A26'
          />
          <Tag name='Số thứ tự đã cấp'
            icon={<PiUserPlusBold />} quantity={468}
            percent='56.41%' percentType='up'
            color='#FFAC6A' backgroundColor=' #FFAC6A26'
          />
          <Tag name='Số thứ tự đã cấp'
            icon={<BsFillBookmarkStarFill />} quantity={32}
            percent='22.41%' percentType='down'
            color='#F86D6D' backgroundColor=' #F86D6D26'
          />
        </div>
        <div className="dashboard_chart">
          <Chart />
        </div>
      </div>

      <div className="dashboard_general-wrap">
        <h3 className='content_title'>Tổng quan</h3>
        <div className="dashboard_general">
          <Label icon={<TbDeviceDesktop />} percent='90%'
            quantity={4221} status={{ on: 3799, off: 422 }}
            name='Thiết bị' color='orange' />
          <Label icon={<IoChatbubblesOutline />} percent='76%'
            quantity={276} status={{ on: 210, off: 66 }}
            name='Thiết bị' color='blue' />
          <Label icon={<GoStack />} percent='86%'
            quantity={4221} status={{ on: 3721, off: 500 }}
            name='Thiết bị' color='green' />
        </div>
        <div className="dashboard_calendar">
          <Calendar className='calendar' fullscreen={false} mode='month'
            headerRender={() => <div className='calendar_header'>{'< 19 Aug 2023 >'}</div>} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
