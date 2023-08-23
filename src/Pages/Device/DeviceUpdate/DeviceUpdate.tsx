import React, { useState } from 'react'
import './deviceupdate.css'
import { deviceDataType } from '../../../type'
import { useAppDispatch, useAppSelector } from '../../../Redux/store'
import { IoMdArrowDropdown } from 'react-icons/io'
import { AiOutlineClose } from 'react-icons/ai'
import { updateDevice } from '../../../Redux/slice/deviceSlice'

function DeviceUpdate({ setCurrTopic, currDevice, currIndex }: any) {
    const serviceList = useAppSelector(state => state.service.serviceList)
    const dispatch = useAppDispatch()


    const [activeDeviceUpdateOption, setActiveDeviceUpdateOptions] = useState<boolean>(false)
    const [deviceAddOption, setDeviceAddOption] = useState<string>('Chọn thiết bị')

    const [userInput, setUserInput] = useState<{ username: string, password: string }>(
        {
            username: 'thucanh',
            password: '1234'
        }
    )
    const currUser = useAppSelector(state => state.users.currUser)
    const [updateDeviceInfo, setUpdateDeviceInfo] = useState<deviceDataType>(currDevice)
    const [serviceInput, setServiceInput] = useState<string>('')

    // handle device option
    const handleDeviceAddOption = (option: string) => {
        setDeviceAddOption(option)
        setUpdateDeviceInfo(prev => ({ ...prev, type: option }))
        setActiveDeviceUpdateOptions(false)
    }
    //handle service input 
    const handleServiceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const serviceList = e.target.value.split(', ')
        setServiceInput((e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)).replace(/,/g, ''))
    }
    //handle service add
    const handleServicePress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ',') {
            let existService = serviceList.some(service => {
                return service.name === serviceInput
            })
            if (!existService) {
                alert(`Dịch vụ ${serviceInput} không tồn tại!`)
                return
            } else {
                setServiceInput('')
                setUpdateDeviceInfo(prev => {
                    const service = [...prev.service, serviceInput]
                    return { ...prev, service: service }
                })
            }
        }
        return
    }

    // handle service delete 
    const handleDeleteService = (service: string) => {
        setUpdateDeviceInfo(prev => {
            const newService = prev.service.filter(item => item !== service)
            return { ...prev, service: newService }
        })
    }
    //submit
    const handleDeviceUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { key, code, name, type, ip, service } = updateDeviceInfo
        const { username, password } = userInput
        console.log(updateDeviceInfo, currIndex)
        if (!key || !code || !name || !type || !ip || !service[0]) {
            alert('vui lòng điền đầy đủ thông tin!')
            return
        }
        if (username !== currUser.username || password !== currUser.password) {
            alert('Thông tin đăng nhập không chính xác')
            return
        }
        dispatch(updateDevice({ updateDeviceInfo, currIndex }))
        console.log({ updateDeviceInfo, currIndex })
        alert('Cập nhật thành công!')
        setTimeout(() => {
            setCurrTopic('device_list')
        }, 1000);


    }

    return (
        <div className="device_add-wrap">
            <h3 className='content_title'>Quản lý thiết bị</h3>
            <form className="device_add" onSubmit={(e) => handleDeviceUpdateSubmit(e)}>
                <div className="device_add-content">
                    <h3>Thông tin thiết bị</h3>
                    <div className="device_add-info">
                        <div>
                            <strong>Mã thiết bị: </strong>
                            <input type="text" value={updateDeviceInfo.code} placeholder='Nhập mã thiết bị'
                                onChange={(e) => setUpdateDeviceInfo(prev => ({ ...prev, code: e.target.value }))} />
                        </div>
                        <div>
                            <strong>Loại thiết bị: </strong>
                            <div className="dropdown" onClick={() => setActiveDeviceUpdateOptions(!activeDeviceUpdateOption)}>
                                {updateDeviceInfo.type}
                                <IoMdArrowDropdown />
                                <div className={!activeDeviceUpdateOption ? "dropdown_list hide" : "dropdown_list "}>
                                    <span onClick={() => handleDeviceAddOption('Kiosk')}>Kiosk</span>
                                    <span onClick={() => handleDeviceAddOption('Display counter')}>Display counter</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <strong>Tên thiết bị: </strong>
                            <input type="text" value={updateDeviceInfo.name} placeholder='Nhập tên thiết bị'
                                onChange={(e) => setUpdateDeviceInfo(prev => ({ ...prev, name: e.target.value, key: e.target.value }))}
                            />
                        </div>
                        <div>
                            <strong>Tên đăng nhập: </strong>
                            <input type="text" placeholder='Nhập tài khoản'
                                onChange={(e) => setUserInput(prev => ({ ...prev, username: e.target.value }))}
                            />
                        </div>
                        <div>
                            <strong>Địa chỉ IP: </strong>
                            <input type="text" value={updateDeviceInfo.ip} placeholder='Nhập địa chỉ IP'
                                onChange={(e) => setUpdateDeviceInfo(prev => ({ ...prev, ip: e.target.value }))}
                            />
                        </div>
                        <div>
                            <strong>Mật khẩu: </strong>
                            <input type="password" placeholder='Nhập mật khẩu'
                                onChange={(e) => setUserInput(prev => ({ ...prev, password: e.target.value }))}
                            />
                        </div>
                        <div>
                            <strong>Dịch vụ sử dụng:</strong>
                            <div className='device_update-service'>
                                <div className="service_list">
                                    {updateDeviceInfo.service.map((service: string) => {
                                        return <label className='service_label' key={service}>
                                            {service}
                                            <AiOutlineClose onClick={() => handleDeleteService(service)}
                                            /></label>
                                    })}
                                </div>
                                <input type="text" placeholder='Thêm dịch vụ bằng dấu "," '
                                    value={serviceInput}
                                    onChange={(e) => handleServiceInput(e)}
                                    onKeyUp={(e) => handleServicePress(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="device_add-btn">
                    <button className="btn outline" type='button'
                        onClick={() => setCurrTopic('device_list')}
                    >Hủy</button>
                    <button className="btn primary" type='submit'>Cập nhật</button>
                </div>
            </form>
        </div>
    )
}

export default DeviceUpdate
