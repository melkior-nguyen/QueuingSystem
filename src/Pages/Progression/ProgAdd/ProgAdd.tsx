import React, { useState } from 'react'
import './progadd.css'
import { serviceData } from '../../../testdata'
import { IoMdArrowDropdown } from 'react-icons/io'

function ProgAdd({ setCurrTopic }: any) {
  const [activeServiceOtions, setActiveServiceOptions] = useState<boolean>(false)
  const [serviceOption, setServiceOption] = useState<string>('Chọn dịch vụ')

  const [activeServiceTicket, setActiveServiceTicket] = useState<boolean>(false)

  const handleServiceOption = (option: string) => {
    setServiceOption(option)
    setActiveServiceOptions(false)
  }

  const handleSubmitAddProg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (serviceOption === 'Chọn dịch vụ') {
      alert('Vui lòng chọn dịch vụ')
      return
    }
    console.log(serviceOption)
    setActiveServiceTicket(true)
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
            {serviceData.map((data, index) => {
              return (
                <span key={index} onClick={() => handleServiceOption(data.name)}>{data.name}</span>
              )
            })}
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
            <button onClick={()=> setCurrTopic('prog_list')}>&times;</button>
            <h3>Số thứ tự được cấp</h3>
            <strong>20230015</strong>
            <span>DV: {serviceOption}</span>
            <div className="service_ticket-date">
              <span>Thời gian cấp: 13:45 14/08/2023</span>
              <span>Hạn sử dụng: 13:45 20/08/2023</span>
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default ProgAdd
