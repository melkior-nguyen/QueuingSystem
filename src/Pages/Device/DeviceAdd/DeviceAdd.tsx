import React, { useState, useEffect } from 'react'
import './deviceadd.css'
import { IoMdArrowDropdown } from 'react-icons/io'
import { deviceDataType } from '../../../type'
import { useAppDispatch, useAppSelector } from '../../../Redux/store'
import { addDevice } from '../../../Redux/slice/deviceSlice'
import { fetchServices } from '../../../Redux/slice/serviceSlice'

function DeviceAdd({ setCurrTopic }: any) {
    const serviceData = useAppSelector(state => state.service.serviceList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchServices())
    }, [])

    const [activeDeviceAddOption, setActiveDeviceAddOptions] = useState<boolean>(false)
    const [deviceAddOption, setDeviceAddOption] = useState<string>('Chọn thiết bị')

    const [userInput, setUserInput] = useState<{ username: string, password: string }>(
        {
            username: '',
            password: ''
        }
    )
    const currUser = useAppSelector(state => state.users.currUser)

    const [newDeviceInfo, setNewDeviceInfo] = useState<deviceDataType>(
        {
            key: '',
            code: '',
            name: '',
            type: '',
            ip: '',
            status: 200,
            connect: 200,
            service: [],
        }
    )
    // handle device option
    const handleDeviceAddOption = (option: string) => {
        setDeviceAddOption(option)
        setNewDeviceInfo(prev => ({ ...prev, type: option }))
        setActiveDeviceAddOptions(false)
    }
    //handle service input 
    const handleServiceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const serviceList = e.target.value.split(', ')
        setNewDeviceInfo(prev => ({ ...prev, service: serviceList }))
    }

    // submit
    const handleDeviceAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { key, code, name, type, ip, service } = newDeviceInfo
        const { username, password } = userInput

        if (!key || !code || !name || !type || !ip || !service[0]) {
            alert('vui lòng điền đầy đủ thông tin!')
            return
        }
        if (username !== currUser.username || password !== currUser.password) {
            alert('Thông tin đăng nhập không chính xác')
            return
        }
        //check with service data list
        let notService = newDeviceInfo.service.filter(service => {
            for (const fbService of serviceData) {
                if (fbService.name === service) return false
            }
            return true
        })
        if (notService.length > 0) {
            alert(`Dịch vụ ${notService} không tồn tại!`)
            return
        }

        dispatch(addDevice(newDeviceInfo))
        alert('Thêm thiết bị thành công')
        setTimeout(() => {
            setCurrTopic('device_list')
        }, 2000);
    }

    return (
        <div className="device_add-wrap">
            <h3 className='content_title'>Quản lý thiết bị</h3>
            <form className="device_add" onSubmit={(e) => handleDeviceAddSubmit(e)}>
                <div className="device_add-content">
                    <h3>Thông tin thiết bị</h3>
                    <div className="device_add-info">
                        <div>
                            <strong>Mã thiết bị: </strong>
                            <input type="text" placeholder='Nhập mã thiết bị'
                                onChange={(e) => setNewDeviceInfo(prev => ({ ...prev, code: e.target.value, key: e.target.value }))} />
                        </div>
                        <div>
                            <strong>Loại thiết bị: </strong>
                            <div className="dropdown" onClick={() => setActiveDeviceAddOptions(!activeDeviceAddOption)}>
                                {deviceAddOption}
                                <IoMdArrowDropdown />
                                <div className={!activeDeviceAddOption ? "dropdown_list hide" : "dropdown_list "}>
                                    <span onClick={() => handleDeviceAddOption('Kiosk')}>Kiosk</span>
                                    <span onClick={() => handleDeviceAddOption('Display counter')}>Display counter</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <strong>Tên thiết bị: </strong>
                            <input type="text" placeholder='Nhập tên thiết bị'
                                onChange={(e) => setNewDeviceInfo(prev => ({ ...prev, name: e.target.value }))}
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
                            <input type="text" placeholder='Nhập địa chỉ IP'
                                onChange={(e) => setNewDeviceInfo(prev => ({ ...prev, ip: e.target.value }))}
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
                            <input type="text" placeholder='Nhập dịch vụ sử dụng'
                                onChange={(e) => handleServiceInput(e)}
                            />
                        </div>
                    </div>
                </div>
                <div className="device_add-btn">
                    <button className="btn outline" type='button'
                        onClick={() => setCurrTopic('device_list')}
                    >Hủy</button>
                    <button className="btn primary" type='submit'>Thêm thiết bị</button>
                </div>
            </form>
        </div>
    )
}

export default DeviceAdd
