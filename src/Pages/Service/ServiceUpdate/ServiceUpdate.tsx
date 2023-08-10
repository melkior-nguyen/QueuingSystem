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
        } else setCheckbox1(true)
    }
    const handleProgCheckbox2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            setCheckbox2(false)
        } else setCheckbox2(true)
    }
    const handleProgCheckbox3 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            setCheckbox3(false)
        } else setCheckbox3(true)
    }
    const handleProgCheckbox4 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            setCheckbox4(false)
        } else setCheckbox4(true)
    }

    //handle progression input
    const [input1, setInput1] = useState<string>('0001')
    const [input2, setInput2] = useState<string>('9999')
    const [input3, setInput3] = useState<string>('0001')
    const [input4, setInput4] = useState<string>('0001')

    const handleProgInput1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput1(e.target.value)
    }
    const handleProgInput2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput2(e.target.value)
    }
    const handleProgInput3 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput3(e.target.value)
    }
    const handleProgInput4 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput4(e.target.value)
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
        if (!checkBox1 && !checkBox2 && !checkBox3 && !checkBox4) {
            alert("Chọn ít nhất một quy tắc cấp số")
            return
        }
        // handle checkbox
        if (checkBox1) {
            setUpdateServiceInfo(prev => {
                const updateService = { ...prev }
                updateService.progRule.auto.start = input1
                updateService.progRule.auto.end = input2
                return updateService
            })
        } else {
            setUpdateServiceInfo(prev => {
                const updateService = { ...prev }
                updateService.progRule.auto.start = 'none'
                updateService.progRule.auto.end = 'none'
                return updateService
            })
        }
        if (checkBox2) {
            setUpdateServiceInfo(prev => {
                const updateService = { ...prev }
                updateService.progRule.prefix = input3
                return updateService
            })
        } else {
            setUpdateServiceInfo(prev => {
                const updateService = { ...prev }
                updateService.progRule.prefix = 'none'
                return updateService
            })
        }
        if (checkBox3) {
            setUpdateServiceInfo(prev => {
                const updateService = { ...prev }
                updateService.progRule.surfix = input4
                return updateService
            })
        } else {
            setUpdateServiceInfo(prev => {
                const updateService = { ...prev }
                updateService.progRule.surfix = 'none'
                return updateService
            })
        }
        if (checkBox4) {
            setUpdateServiceInfo(prev => {
                const updateService = { ...prev }
                updateService.progRule.reset = true
                return updateService
            })
        } else {
            setUpdateServiceInfo(prev => {
                const updateService = { ...prev }
                updateService.progRule.reset = false
                return updateService
            })
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
                            <input type="text"
                                onChange={handleProgInput1}
                                value={input1} />
                            <span style={{ width: 'max-content' }}>đến</span>
                            <input type="text"
                                onChange={handleProgInput2}
                                value={input2} />
                        </div>
                        <div className="service_update-progression-rule">
                            <input type="checkbox" onChange={(e) => handleProgCheckbox2(e)} checked={checkBox2} />
                            <span>Prefix</span>
                            <input type="text"
                                onChange={handleProgInput3}
                                value={input3} />
                        </div>
                        <div className="service_update-progression-rule">
                            <input type="checkbox" onChange={(e) => handleProgCheckbox3(e)} checked={checkBox3} />
                            <span>Surfix</span>
                            <input type="text"
                                onChange={handleProgInput4}
                                value={input4} />
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
