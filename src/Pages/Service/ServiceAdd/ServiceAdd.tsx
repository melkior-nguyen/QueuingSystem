import React, { useState } from 'react'
import './serviceadd.css'
import { serviceDataType } from '../../../type'
import { useAppDispatch } from '../../../Redux/store'
import { addService } from '../../../Redux/slice/serviceSlice'

function ServiceAdd({ setCurrTopic }: any) {
    const dispatch = useAppDispatch()

    const [newServiceInfo, setNewServiceInfo] = useState<serviceDataType>(
        {
            key: '',
            code: '',
            name: '',
            desc: '',
            status: 200,
            progRule: {
                auto: {
                    start: 'none',
                    end: 'none'
                },
                prefix: 'none',
                surfix: 'none',
                reset: false
            }
        }
    )

    //handle progression checkbox
    const [checkBox1, setCheckbox1] = useState<boolean>(false)
    const [checkBox2, setCheckbox2] = useState<boolean>(false)
    const [checkBox3, setCheckbox3] = useState<boolean>(false)
    const [checkBox4, setCheckbox4] = useState<boolean>(false)


    const handleProgCheckbox1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            setCheckbox1(false)
            setNewServiceInfo(prev => {
                const newService = { ...prev }
                newService.progRule.auto.start = 'none'
                newService.progRule.auto.end = 'none'
                return newService
            })
        } else {
            setCheckbox1(true)
            setNewServiceInfo(prev => {
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
            setNewServiceInfo(prev => {
                const newService = { ...prev }
                newService.progRule.prefix = 'none'
                return newService
            })
        } else {
            setCheckbox2(true)
            setNewServiceInfo(prev => {
                const newService = { ...prev }
                newService.progRule.prefix = '2023_'
                return newService
            })
        }
    }
    const handleProgCheckbox3 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            setCheckbox3(false)
            setNewServiceInfo(prev => {
                const newService = { ...prev }
                newService.progRule.surfix = 'none'
                return newService
            })
        } else {
            setCheckbox3(true)
            setNewServiceInfo(prev => {
                const newService = { ...prev }
                newService.progRule.surfix = '_Alta'
                return newService
            })
        }
    }
    const handleProgCheckbox4 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            setCheckbox4(false)
            setNewServiceInfo(prev => {
                const newService = { ...prev }
                newService.progRule.reset = false
                return newService
            })
        } else {
            setCheckbox4(true)
            setNewServiceInfo(prev => {
                const newService = { ...prev }
                newService.progRule.reset = true
                return newService
            })
        }
    }

    // submit
    const handleServiceAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { key, code, name, desc } = newServiceInfo
        //check enough info
        if (!key || !code || !name || !desc) {
            alert('Vui lòng điền đầy đủ thông tin!')
            return
        }
        if (!checkBox1 && !checkBox2 && !checkBox3) {
            alert("Chọn ít nhất một quy tắc cấp số")
            return
        }

        dispatch(addService(newServiceInfo))
        alert('Thêm dịch vụ thành công!')
        setTimeout(() => {
            setCurrTopic('service_list')
        }, 1000);

    }
    return (
        <div className="service_add-wrap">
            <h3 className='content_title'>Quản lý Dịch vụ</h3>
            <form className="service_add" onSubmit={(e) => handleServiceAddSubmit(e)}>
                <div className="service_add-content">
                    <h3>Thông tin Dịch vụ</h3>
                    <div className="service_add-info">
                        <div className="service_add-info-left">
                            <strong>Mã dịch vụ: </strong>
                            <input type="text" placeholder='Nhập mã dịch vụ'
                                onChange={(e) => setNewServiceInfo(prev => ({ ...prev, code: e.target.value }))} />
                            <strong>Tên dịch vụ: </strong>
                            <input type="text" placeholder='Nhập tên dịch vụ'
                                onChange={(e) => setNewServiceInfo(prev => ({ ...prev, name: e.target.value, key: e.target.value }))}
                            />
                        </div>
                        <div className="service_add-info-right">
                            <strong>Mô tả:</strong>
                            <textarea placeholder='Mô tả dịch vụ' rows={4}
                                onChange={(e) => setNewServiceInfo(prev => ({ ...prev, desc: e.target.value }))}
                            />
                        </div >
                    </div>

                    {/* progression method */}
                    <h3>Quy tắc cấp số</h3>
                    <div className="service_add-progression">
                        <div className="service_add-progression-rule">
                            <input type="checkbox" onChange={(e) => handleProgCheckbox1(e)} checked={checkBox1} />
                            <span>Tăng tự động từ</span>
                            <p>0001</p>
                            <span style={{ width: 'max-content' }}>đến</span>
                            <p>9999</p>
                        </div>
                        <div className="service_add-progression-rule">
                            <input type="checkbox" onChange={(e) => handleProgCheckbox2(e)} checked={checkBox2} />
                            <span>Prefix</span>
                            <p>2023</p>
                        </div>
                        <div className="service_add-progression-rule">
                            <input type="checkbox" onChange={(e) => handleProgCheckbox3(e)} checked={checkBox3} />
                            <span>Surfix</span>
                            <p>Alta</p>
                        </div>
                        <div className="service_add-progression-rule">
                            <input type="checkbox" onChange={(e) => handleProgCheckbox4(e)} checked={checkBox4} />
                            <span>Reset mỗi ngày</span>
                        </div>

                    </div>
                </div>
                <div className="service_add-btn">
                    <button className="btn outline" type='button'
                        onClick={() => setCurrTopic('service_list')}
                    >Hủy</button>
                    <button className="btn primary" type='submit'>Thêm dịch vụ</button>
                </div>
            </form>
        </div>
    )
}

export default ServiceAdd
