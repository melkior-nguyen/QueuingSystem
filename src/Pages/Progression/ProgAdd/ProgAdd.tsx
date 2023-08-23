import React, { useEffect, useState } from 'react'
import './progadd.css'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useAppDispatch, useAppSelector } from '../../../Redux/store'
import { fetchServices } from '../../../Redux/slice/serviceSlice'
import { customerDataType } from '../../../type'
import dayjs from 'dayjs'
import { customerData } from '../../../testdata'
import { addCustomer, fetchCustomer } from '../../../Redux/slice/customerSlice'

function ProgAdd({ setCurrTopic }: any) {
  const serviceList = useAppSelector(state => state.service.serviceList)
  const customerList = useAppSelector(state => state.customer.customerList)
  const dispatch = useAppDispatch()
  const [activeServiceOtions, setActiveServiceOptions] = useState<boolean>(false)
  const [serviceOption, setServiceOption] = useState<string>('Chọn dịch vụ')
  const [activeServiceTicket, setActiveServiceTicket] = useState<boolean>(false)
  const [customerInfo, setCustomerInfo] = useState<customerDataType>(
    {
      key: '',
      number: '',
      name: '',
      telephone: '',
      email: '',
      service: '',
      time_get: dayjs().format('HH:mm-DD/MM/YYYY'),
      time_expired: dayjs().add(2, 'day').format('HH:mm-DD/MM/YYYY'),
      status: 300,
      source: 'Hệ thống'
    })

  useEffect(() => {
    dispatch(fetchServices())
    dispatch(fetchCustomer())
  }, [dispatch])

  useEffect(() => {
    if (serviceOption !== 'Chọn dịch vụ') {
      handleNumber();
    }
  }, [serviceOption]);

  const handleServiceOption = (option: string) => {
    setServiceOption(option)
    setCustomerInfo(prev => ({ ...prev, service: option }))
    setActiveServiceOptions(false)
  }

  //handle number
  const handleNumber = () => {
    //get current service
    const selectService = serviceList.filter(service => service.name === customerInfo.service)

    let number = ''
    // check rule
    if (selectService[0]?.progRule.auto.start === 'none') {
      let ranNum = (Math.floor(Math.random() * 9999 + 1)).toString()
      while (ranNum.length < 4) {
        ranNum = '0' + ranNum
      }
      number = 'r' + ranNum
    } else {
      let count = 0
      customerList.forEach(cus => {
        if (cus.service === serviceOption) {
          const match = cus.number.match(/_(\d+)_?/)
          if (match && match[1].length === 4) {
            count++
          }
        }
      })
      let strCount = (count + 1).toString()
      while (strCount.length < 4) {
        strCount = '0' + strCount
      }
      number = strCount
    }
    if (selectService[0].progRule.prefix !== 'none') {
      number = selectService[0].progRule.prefix + number
    }
    if (selectService[0].progRule.surfix !== 'none') {
      number = number + selectService[0].progRule.surfix
    }
    setCustomerInfo(prev => ({ ...prev, number: number, key: number }))
  }

  // Submit
  const handleSubmitAddProg = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // check service choice
    if (serviceOption === 'Chọn dịch vụ') {
      alert('Vui lòng chọn dịch vụ')
      return
    }
    // handle customer info
    if (customerInfo.name === '' && customerInfo.telephone === '' && customerInfo.email === '') {
      alert('Vui lòng điền đầy đủ thông tin')
      return
    }

    if (Number.isNaN(Number(customerInfo.telephone)) || customerInfo.telephone.length < 10) {
      alert('Số điện thoại không hợp lệ')
      return
    }

    setActiveServiceTicket(true)
    dispatch(addCustomer(customerInfo))
  }

  return (
    <div className="prog_add-wrap">
      <h3 className='content_title'>Quản lý cấp số</h3>

      <form className="prog_add" onSubmit={handleSubmitAddProg}>
        <h2>CẤP SỐ MỚI</h2>
        <span>Dịch vụ khách hàng lựa chọn</span>

        <div className="dropdown" onClick={() => setActiveServiceOptions(!activeServiceOtions)}>
          {serviceOption}
          <IoMdArrowDropdown />
          <div className={!activeServiceOtions ? "dropdown_list hide" : "dropdown_list "}>
            {serviceList.map((data, index) => {
              return (
                <span key={index} onClick={() => handleServiceOption(data.name)}>{data.name}</span>
              )
            })}
          </div>
        </div>

        <div className="customer_info">
          <div className="customer_info-box">
            <span>Tên khách hàng</span>
            <input type="text" value={customerInfo.name}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))} />
          </div>
          <div className="customer_info-box">
            <span>Số điện thoại</span>
            <input type="text" value={customerInfo.telephone}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, telephone: e.target.value }))} />
          </div>
          <div className="customer_info-box">
            <span>Email</span>
            <input type="email" value={customerInfo.email}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))} />
          </div>
        </div>

        <div className="prog_add-btn">
          <button className="btn outline" type='button'
            onClick={() => setCurrTopic('prog_list')}
          >Hủy</button>
          <button className="btn primary" type='submit'>In số</button>
        </div>

      </form>

      {activeServiceTicket &&
        <div className="service_ticket-wrap">
          <div className="service_ticket">
            <button onClick={() => setCurrTopic('prog_list')}>&times;</button>
            <h3>Số thứ tự được cấp</h3>
            <strong>{customerInfo.number}</strong>
            <span>DV: {serviceOption}</span>
            <div className="service_ticket-date">
              <span>Thời gian cấp: {customerInfo.time_get}</span>
              <span>Hạn sử dụng: {customerInfo.time_expired}</span>
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default ProgAdd
