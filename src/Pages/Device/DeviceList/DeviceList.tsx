import React, { ReactElement, useState, useEffect } from 'react'
import './devicelist.css'
import { IoMdArrowDropdown } from 'react-icons/io'
import { Search } from '../../../Components'
import { Table } from 'antd'
import { GoDotFill } from 'react-icons/go'
import { AiOutlinePlus } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from '../../../Redux/store'
import { fetchDevices } from '../../../Redux/slice/deviceSlice'
import { fetchCurrUser } from '../../../Redux/slice/userSlice'
import { fetchRoles } from '../../../Redux/slice/roleSlice'

function DeviceList({ setCurrTopic, setCurrDevice, setCurrIndex }: any) {
    const deviceList = useAppSelector(state => state.devices.deviceList)
    const currUser = useAppSelector(state => state.users.currUser)
    const roleList = useAppSelector(state => state.role.roleList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchDevices())
        dispatch(fetchCurrUser())
        dispatch(fetchRoles())
    }, [dispatch])

    const [activeStatusOptions, setActiveStatusOptions] = useState<boolean>(false)
    const [activeConnectOptions, setActiveConnectOptions] = useState<boolean>(false)

    const [statusOption, setStatusOption] = useState<string>('Tất cả')
    const [connectOption, setConnectOption] = useState<string>('Tất cả')

    const [searchInput, setSearchInput] = useState<string>('')


    const handleStatusOptions = (option: string) => {
        setStatusOption(option)
        setActiveStatusOptions(false)
    }
    const handleConnectOptions = (option: string) => {
        setConnectOption(option)
        setActiveConnectOptions(false)
    }

    //handle table
    const columns = [
        {
            title: 'Mã thiết bị',
            key: 'code',
            dataIndex: 'code',
        },
        {
            title: 'Tên thiết bị',
            key: 'name',
            dataIndex: 'name',
            filteredValue: [searchInput],
            onFilter: (value: any, record: any) => {
                if (value !== '') {
                    return record.name.toLowerCase().indexOf(value.toLowerCase()) !== -1   
                }
                else return record.name
            }
        },
        {
            title: 'Địa chỉ IP',
            key: 'ip',
            dataIndex: 'ip',
        },
        {
            title: 'Trạng thái hoạt động',
            key: 'status',
            dataIndex: 'status',
            filteredValue: [statusOption],
            onFilter: (value: any, record: any): any => {
                if (value === 'Hoạt động') return record.status === 200
                else if (value === 'Ngưng hoạt động') return record.status === 404
                else return record.status
            },
            render: (text: any, record: any, index: number): any => {
                if (text === 200) return <span className="align_center"><GoDotFill style={{ color: 'green' }} />Hoạt động</span>
                if (text === 404) return <span className="align_center"><GoDotFill style={{ color: 'red' }} />Ngưng hoạt động</span>
                return <span>---</span>
            }
        },
        {
            title: 'Trạng thái kết nối',
            key: 'connect',
            dataIndex: 'connect',
            filteredValue: [connectOption],
            onFilter: (value: any, record: any): any => {
                if (value === 'Kết nối') return record.connect === 200
                else if (value === 'Mất kết nối') return record.connect === 404
                else return record.connect
            },
            render: (text: any, record: any, index: number): any => {
                if (text === 200) return <span className="align_center"><GoDotFill style={{ color: 'green' }} />Kết nối</span>
                if (text === 404) return <span className="align_center"><GoDotFill style={{ color: 'red' }} />Mất kết nối</span>
                return <span>---</span>
            }
        },
        {
            title: 'Dịch vụ sử dụng',
            key: 'service',
            dataIndex: 'service',
            render: (text: any, record: any, index: number): ReactElement => {
                return (
                    <span style={{ display: 'block', whiteSpace: 'nowrap', width: '20rem', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >{text.join(', ')}</span>
                )
            }
        },
        {
            title: '',
            key: 'detail',
            dataIndex: '',
            render: (text: any, record: any, index: number): ReactElement => {
                return (
                    <span
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                        onClick={() => {
                            setCurrDevice(record)
                            setCurrTopic('device_detail')
                        }
                        }
                    >Chi tiết</span>
                )
            }
        },
        {
            title: '',
            key: 'update',
            dataIndex: '',
            render: (text: any, record: any, index: number): ReactElement => {
                return (
                    <span
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                        onClick={() => {
                            const userRole = roleList.find(role => role.name === currUser.role)
                            if (!userRole?.role.A.device) {
                                alert('Không có quyền thực hiện chức năng này!')
                                return
                            }
                            setCurrDevice(record)
                            setCurrIndex(index)
                            setCurrTopic('device_update')
                        }}
                    >Cập nhật</span>
                )
            }
        },
    ]


    return (
        <div className="device_list-wrap">
            <h3 className='content_title'>Danh sách thiết bị</h3>
            <div className="device_list">
                {/* Main */}
                <div className="device_list-main">
                    {/* Navbar */}
                    <div className="device_list-nav">
                        <div className="device_list-status">
                            <span>Trạng thái hoạt động</span>
                            <div className="dropdown device_list-dropdown" onClick={() => setActiveStatusOptions(!activeStatusOptions)}>
                                {statusOption}
                                <IoMdArrowDropdown />
                                <div className={!activeStatusOptions ? "dropdown_list hide" : "dropdown_list "}>
                                    <span onClick={() => handleStatusOptions('Tất cả')}>Tất cả</span>
                                    <span onClick={() => handleStatusOptions('Hoạt động')}>Hoạt động</span>
                                    <span onClick={() => handleStatusOptions('Ngưng hoạt động')}>Ngưng hoạt động</span>
                                </div>
                            </div>
                        </div>
                        <div className="device_list-connect">
                            <span>Trạng thái kết nối</span>
                            <div className="dropdown device_list-dropdown" onClick={() => setActiveConnectOptions(!activeConnectOptions)}>
                                {connectOption}
                                <IoMdArrowDropdown />
                                <div className={!activeConnectOptions ? "dropdown_list hide" : "dropdown_list "}>
                                    <span onClick={() => handleConnectOptions('Tất cả')}>Tất cả</span>
                                    <span onClick={() => handleConnectOptions('Kết nối')}>Kết nối</span>
                                    <span onClick={() => handleConnectOptions('Mất kết nối')}>Mất kết nối</span>
                                </div>
                            </div>
                        </div>
                        <div className="device_list-search">
                            <span>Từ khóa </span>
                            <Search setSearchInput={setSearchInput} />
                        </div>
                    </div>
                    {/* Table */}
                    <div className="device_list-table">
                        <Table
                            columns={columns}
                            dataSource={deviceList}
                            pagination={{ pageSize: 8, showSizeChanger: false }} />
                    </div>
                </div>
                {/* Sub */}
                <div className="device_list-sub">
                    <div className="main_btn" onClick={() => {
                        const userRole = roleList.find(role => role.name === currUser.role)
                        if (!userRole?.role.A.device) {
                            alert('Không có quyền thực hiện chức năng này!')
                            return
                        }
                        setCurrTopic('device_add')
                    }}>
                        <div className="main_btn-icon">
                            <AiOutlinePlus />
                        </div>
                        Thêm thiết bị
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeviceList
