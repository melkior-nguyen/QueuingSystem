import React, { useEffect, useState } from 'react'
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
import { useAppDispatch, useAppSelector } from '../../Redux/store'
import { fetchCustomer } from '../../Redux/slice/customerSlice'
import { fetchDevices } from '../../Redux/slice/deviceSlice'
import { fetchServices } from '../../Redux/slice/serviceSlice'
import dayjs from 'dayjs'

function Dashboard() {
  const customerList = useAppSelector(state => state.customer.customerList)
  const deviceList = useAppSelector(state => state.devices.deviceList)
  const serviceList = useAppSelector(state => state.service.serviceList)
  const dispatch = useAppDispatch()
  // customer
  useEffect(() => {
    dispatch(fetchCustomer())

    setCustomerTotal(customerList.length)
    setUsedCustomer(customerList.filter(cus => cus.status === 200).length)
    setWaitingCustomer(customerList.filter(cus => cus.status === 300).length)
    setNotUsedCustomer(customerList.filter(cus => cus.status === 404).length)
  }, [dispatch])
  //device
  useEffect(() => {
    dispatch(fetchDevices())

    setDeviceTotal(deviceList.length)
    setUsingDevice(deviceList.filter(device => device.status === 200).length)
    setStopDevice(deviceList.filter(device => device.status === 404).length)
  }, [dispatch])

  //service
  useEffect(() => {
    dispatch(fetchServices())

    setServiceTotal(serviceList.length)
    setUsingService(serviceList.filter(service => service.status === 200).length)
    setStopService(serviceList.filter(service => service.status === 404).length)
  }, [dispatch])

  const [customerTotal, setCustomerTotal] = useState<number>(0)
  const [usedCustomer, setUsedCustomer] = useState<number>(0)
  const [waitingCustomer, setWaitingCustomer] = useState<number>(0)
  const [notUsedCustomer, setNotUsedCustomer] = useState<number>(0)

  const [deviceTotal, setDeviceTotal] = useState<number>(0)
  const [usingDevice, setUsingDevice] = useState<number>(0)
  const [stopDevice, setStopDevice] = useState<number>(0)

  const [serviceTotal, setServiceTotal] = useState<number>(0)
  const [usingService, setUsingService] = useState<number>(0)
  const [stopService, setStopService] = useState<number>(0)

  //handle calendar 
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs())

  return (
    <div className='main_content dashboard'>
      <h3 className='top_content '>
        <span className='current'>Dashboard</span>
      </h3>
      <div className="dashboard_chart-wrap">
        <h3 className='content_title'>Biểu đồ cấp số</h3>
        <div className="dashboard_chart-detail">
          <Tag name='Số thứ tự đã cấp'
            icon={<BsCalendar />} quantity={customerTotal}
            percent='32.41%' percentType='up'
            color='#6695FB' backgroundColor=' #6695FB26'
          />
          <Tag name='Số thứ tự đã sử dụng'
            icon={<BsCalendarCheck />} quantity={usedCustomer}
            percent='32.41%' percentType='down'
            color='#35C75A' backgroundColor=' #35C75A26'
          />
          <Tag name='Số thứ tự đang chờ'
            icon={<PiUserPlusBold />} quantity={waitingCustomer}
            percent='56.41%' percentType='up'
            color='#FFAC6A' backgroundColor=' #FFAC6A26'
          />
          <Tag name='Số thứ tự đã bỏ qua'
            icon={<BsFillBookmarkStarFill />} quantity={notUsedCustomer}
            percent='22.41%' percentType='down'
            color='#F86D6D' backgroundColor=' #F86D6D26'
          />
        </div>
        <div className="dashboard_chart">
          <Chart currDate={selectedDate}/>
        </div>
      </div>

      <div className="dashboard_general-wrap">
        <h3 className='content_title'>Tổng quan</h3>
        <div className="dashboard_general">
          <Label icon={<TbDeviceDesktop />} percent={stopDevice / deviceTotal * 100}
            quantity={deviceTotal} status={{ on: usingDevice, off: stopDevice }}
            name='Thiết bị' color='orange' />
          <Label icon={<IoChatbubblesOutline />} percent={stopService / serviceTotal * 100}
            quantity={serviceTotal} status={{ on: usingService, off: stopService }}
            name='Dịch vụ' color='blue' />
          <Label icon={<GoStack />} percent={notUsedCustomer / customerTotal * 100}
            quantity={customerTotal} status={{ on: usedCustomer + waitingCustomer, off: notUsedCustomer }}
            name='Cấp số  ' color='green' />
        </div>
        <div className="dashboard_calendar">
          <Calendar className='calendar' fullscreen={false} value={selectedDate}
            headerRender={({ value, onChange }) => (
              <div className='calendar_header'>
                <button onClick={() => onChange(value.clone().subtract(1, 'month'))}>&lt;</button>
                {value.format('DD MM YYYY')}
                <button onClick={() => onChange(value.clone().add(1, 'month'))}>&gt;</button>
              </div>
            )}
            onSelect={(value) => setSelectedDate(value)}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
