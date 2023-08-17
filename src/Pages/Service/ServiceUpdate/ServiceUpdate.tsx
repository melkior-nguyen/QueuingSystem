import React, { useState } from 'react'
import './serviceupdate.css'
import { serviceDataType } from '../../../type'


function ServiceUpdate({ setCurrTopic, currservice }: any) {
    const [updateServiceInfo, setUpdateServiceInfo] = useState<serviceDataType>(currservice)

    //handle progression checkbox
    const [checkBox1, setCheckbox1] = useState<boolean>(currservice.progRule.auto.start !== 'none')
    const [checkBox2, setCheckbox2] = useState<boolean>(currservice.progRule.prefix !== 'none')
    const [checkBox3, setCheckbox3] = useState<boolean>(currservice.progRule.surfix !== 'none')
    const [checkBox4, setCheckbox4] = useState<boolean>(currservice.progRule.reset !== 'none')


    const handleProgCheckbox1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            setCheckbox1(false)
            setUpdateServiceInfo(prev => {
                const newService = { ...prev }
                newService.progRule.auto.start = 'none'
                newService.progRule.auto.end = 'none'
                return newService
            })
        } else {
            setCheckbox1(true)
            setUpdateServiceInfo(prev => {
                const newService = { ...prev }
                newService.progRule.auto.start = '0001'
                newService.progRule.auto.end = '9999'
                return newService
            })
        }
    }
    const handleProgCheckbox2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            setCheckbox2(false)
            setUpdateServiceInfo(prev => {
                const newService = { ...prev }
                newService.progRule.prefix = 'none'
                return newService
            })
        } else {
            setCheckbox2(true)
            setUpdateServiceInfo(prev => {
                const newService = { ...prev }
                newService.progRule.prefix = '2023'
                return newService
            })
        }
    }
    const handleProgCheckbox3 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            setCheckbox3(false)
            setUpdateServiceInfo(prev => {
                const newService = { ...prev }
                newService.progRule.surfix = 'none'
                return newService
            })
        } else {
            setCheckbox3(true)
            setUpdateServiceInfo(prev => {
                const newService = { ...prev }
                newService.progRule.surfix = '2023'
                return newService
            })
        }
    }
    const handleProgCheckbox4 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            setCheckbox4(false)
            setUpdateServiceInfo(prev => {
                const newService = { ...prev }
                newService.progRule.reset = false
                return newService
            })
        } else {
            setCheckbox4(true)
            setUpdateServiceInfo(prev => {
                const newService = { ...prev }
                newService.progRule.reset = true
                return newService
            })
        }
    }

    // submit
    const handleServiceupdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { key, code, name, desc } = updateServiceInfo
        //check enough info
        if (!key || !code || !name || !desc) {
            alert('Vui lòng điền đầy đủ thông tin!')
            return
        }
        if (!checkBox1 && !checkBox2 && !checkBox3) {
            alert("Chọn ít nhất một quy tắc cấp số")
            return
        }
        console.log(updateServiceInfo)
        alert('Cập nhật thành công!')
        setCurrTopic('service_list')
    }
    return (
        <div className="service_update-wrap">
            <h3 className='content_title'>Quản lý Dịch vụ</h3>
            <form className="service_update" onSubmit={(e) => handleServiceupdateSubmit(e)}>
                <div className="service_update-content">
                    <h3>Thông tin Dịch vụ</h3>
                    <div className="service_update-info">
                        <div className="service_update-info-left">
                            <strong>Mã dịch vụ: </strong>
                            <input type="text" placeholder='Nhập mã dịch vụ' value={updateServiceInfo.code}
                                onChange={(e) => setUpdateServiceInfo(prev => ({ ...prev, code: e.target.value }))} />
                            <strong>Tên dịch vụ: </strong>
                            <input type="text" placeholder='Nhập tên dịch vụ' value={updateServiceInfo.name}
                                onChange={(e) => setUpdateServiceInfo(prev => ({ ...prev, name: e.target.value, key: e.target.value }))}
                            />
                        </div>
                        <div className="service_update-info-right">
                            <strong>Mô tả:</strong>
                            <textarea placeholder='Mô tả dịch vụ' rows={4} value={updateServiceInfo.desc}
                                onChange={(e) => setUpdateServiceInfo(prev => ({ ...prev, desc: e.target.value }))}
                            />
                        </div >
                    </div>

                    {/* progression method */}
                    <h3>Quy tắc cấp số</h3>
                    <div className="service_update-progression">
                        <div className="service_update-progression-rule">
                            <input type="checkbox" onChange={(e) => handleProgCheckbox1(e)} checked={checkBox1} />
                            <span>Tăng tự động từ</span>
                            <p>0001</p>
                            <span style={{ width: 'max-content' }}>đến</span>
                            <p>9999</p>
                        </div>
                        <div className="service_update-progression-rule">
                            <input type="checkbox" onChange={(e) => handleProgCheckbox2(e)} checked={checkBox2} />
                            <span>Prefix</span>
                            <p>2023</p>
                        </div>
                        <div className="service_update-progression-rule">
                            <input type="checkbox" onChange={(e) => handleProgCheckbox3(e)} checked={checkBox3} />
                            <span>Surfix</span>
                            <p>2023</p>
                        </div>
                        <div className="service_update-progression-rule">
                            <input type="checkbox" onChange={(e) => handleProgCheckbox4(e)} checked={checkBox4} />
                            <span>Reset mỗi ngày</span>
                        </div>

                    </div>
                </div>
                <div className="service_update-btn">
                    <button className="btn outline" type='button'
                        onClick={() => setCurrTopic('service_list')}
                    >Hủy</button>
                    <button className="btn primary" type='submit'>Cập nhật</button>
                </div>
            </form>
        </div>
    )
}

export default ServiceUpdate