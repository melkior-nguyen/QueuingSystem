import React from 'react'
import './devicedetail.css'
import { deviceDataType } from '../../../type'
import { useAppSelector } from '../../../Redux/store'
import { BsFillPenFill } from 'react-icons/bs'

function DeviceDetail({ currDevice, setCurrTopic }: any) {
    const currUser = useAppSelector(state => state.users.currUser)

    return (
        <div className="device_detail-wrap">
            <h3 className='content_title'>Quản lý thiết bị</h3>
            <div className="device_detail">
                {/* Main */}
                <div className="device_detail-main">
                    <h3>Thông tin thiết bị</h3>
                    <div className="device_detail_list">
                        <p>
                            <strong>Mã thiết bị: </strong>
                            <span>{currDevice.code}</span>
                        </p>
                        <p>
                            <strong>Loại thiết bị: </strong>
                            <span>{currDevice.name}</span>
                        </p>
                        <p>
                            <strong>Tên thiết bị: </strong>
                            <span>{currDevice.name}</span>
                        </p>
                        <p>
                            <strong>Tên đăng nhập: </strong>
                            <span>{currUser.username}</span>
                        </p>
                        <p>
                            <strong>Địa chỉ IP: </strong>
                            <span>{currDevice.ip}</span>
                        </p>
                        <p>
                            <strong>Mật khẩu: </strong>
                            <span>{currUser.password}</span>
                        </p>
                        <div>
                            <strong>Dịch vụ sử dụng:</strong><br /><br />
                            <span>{currDevice.service.join(', ')}</span>
                        </div>
                    </div>
                </div>
                {/* Sub */}
                <div className="device_detail-sub">
                    <div className="main_btn" onClick={()=> setCurrTopic('device_update')}>
                        <div className="main_btn-icon">
                            <BsFillPenFill />
                        </div>
                        Cập nhật thiết bị
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeviceDetail
