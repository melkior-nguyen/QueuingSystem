import React, { useState, ReactElement, useEffect } from 'react'
import './proglist.css'
import { GoDotFill } from 'react-icons/go'
import { IoMdArrowDropdown } from 'react-icons/io'
import { DatePicker, Table } from 'antd'
import { AiFillCaretRight, AiOutlinePlus } from 'react-icons/ai'
import { Search } from '../../../Components'
import { customerData, serviceData } from '../../../testdata'
import { useAppDispatch, useAppSelector } from '../../../Redux/store'
import { fetchCustomer } from '../../../Redux/slice/customerSlice'
import { fetchServices } from '../../../Redux/slice/serviceSlice'
import dayjs from 'dayjs'
import { fetchCurrUser } from '../../../Redux/slice/userSlice'
import { fetchRoles } from '../../../Redux/slice/roleSlice'

function ProgList({ setCurrTopic, setCurrProg }: any) {
    const customerList = useAppSelector(state => state.customer.customerList)
    const serviceList = useAppSelector(state => state.service.serviceList)
    const currUser = useAppSelector(state => state.users.currUser)
    const roleList = useAppSelector(state => state.role.roleList)
    const dispatch = useAppDispatch()
    const [activeStatusOptions, setActiveStatusOptions] = useState<boolean>(false)
    const [statusOption, setStatusOption] = useState<string>('Tất cả')

    const [activeServiceOptions, setActiveServiceOptions] = useState<boolean>(false)
    const [serviceOption, setServiceOption] = useState<string>('Tất cả')

    const [activeSourceOptions, setActiveSourceOptions] = useState<boolean>(false)
    const [sourceOption, setSourceOption] = useState<string>('Tất cả')

    const [date, setDate] = useState<{ start: string, end: string }>({ start: '', end: '' })

    const [searchInput, setSearchInput] = useState<string>('')

    useEffect(() => {
        dispatch(fetchServices())
        dispatch(fetchCurrUser())
        dispatch(fetchRoles())
    }, [dispatch])
    useEffect(() => {
        dispatch(fetchCustomer())
    }, [])


    const handleStatusOptions = (option: string) => {
        setStatusOption(option)
        setActiveStatusOptions(false)
    }

    const handleServiceOptions = (option: string) => {
        setServiceOption(option)
        setActiveServiceOptions(false)
    }

    const handleSourceOptions = (option: string) => {
        setSourceOption(option)
        setActiveSourceOptions(false)
    }

    //handle table
    const columns = [
        {
            title: 'STT',
            key: 'STT',
            dataIndex: 'number',
        },
        {
            title: 'Tên khách hàng',
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
            title: 'Tên dịch vụ',
            key: 'service',
            dataIndex: 'service',
            filteredValue: [serviceOption],
            onFilter: (value: any, record: any): any => {
                if (value !== 'Tất cả') return record.service === value
                return record.service
            },
        },
        {
            title: 'Thời gian cấp',
            key: 'time_get',
            dataIndex: 'time_get'
        },
        {
            title: 'Hạn sử dụng',
            key: 'time_expired',
            dataIndex: 'time_expired',
            filteredValue: [date.start, date.end],
            onFilter: (value: any, record: any): any => {
                const recordDate = dayjs(record.time_expired, 'HH:mm-DD/MM/YYYY')
                const startDate = dayjs(date.start, 'YYYY-MM-DD')
                const endDate = dayjs(date.end, 'YYYY-MM-DD')
                if (date.start === '' && date.end === '') return record.time_expired
                if (date.start === '' && recordDate.isBefore(endDate)) return record.time_expired
                if (date.end === '' && recordDate.isAfter(startDate)) return record.time_expired
                if (recordDate.isBefore(endDate) && recordDate.isAfter(startDate)) return record.time_expired
            }
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            filteredValue: [statusOption],
            onFilter: (value: any, record: any): any => {
                if (value === 'Đã sử dụng') return record.status === 200
                else if (value === 'Đang chờ') return record.status === 300
                else if (value === 'Bỏ qua') return record.status === 404
                else return record.status
            },
            render: (text: any, record: any, index: number): ReactElement => {
                if (text === 200) return <span className="align_center"><GoDotFill style={{ color: 'gray' }} />Đã sử dụng</span>
                if (text === 300) return <span className="align_center"><GoDotFill style={{ color: 'blue' }} />Đang chờ</span>
                if (text === 404) return <span className="align_center"><GoDotFill style={{ color: 'red' }} />Bỏ qua</span>
                return <span>---</span>
            }
        },
        {
            title: 'Nguồn cấp',
            key: 'source',
            dataIndex: 'source',
            filteredValue: [sourceOption],
            onFilter: (value: any, record: any): any => {
                if (value !== 'Tất cả') return record.source === value
                return record.source
            },
        },
        {
            title: '',
            key: 'detail',
            render: (text: any, record: any, index: number): ReactElement => {
                return (
                    <span
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                        onClick={() => {
                            setCurrProg(record)
                            setCurrTopic('prog_detail')
                        }
                        }
                    >Chi tiết</span>
                )
            }
        },
    ]
    return (
        <div className="prog_list-wrap">
            <h3 className='content_title'>Quản lý cấp số</h3>
            <div className="prog_list">
                {/* Main */}
                <div className="prog_list-main">
                    {/* Navbar */}
                    <div className="prog_list-nav">
                        <div className="prog_list-status">
                            <span>Tên dịch vụ</span>
                            <div className="dropdown prog_list-dropdown" onClick={() => setActiveServiceOptions(!activeServiceOptions)}>
                                {serviceOption}
                                <IoMdArrowDropdown />
                                <div className={!activeServiceOptions ? "dropdown_list hide" : "dropdown_list "}>
                                    <span onClick={() => handleServiceOptions('Tất cả')}>Tất cả</span>
                                    {serviceList.map(data => {
                                        return (
                                            <span onClick={() => handleServiceOptions(data.name)}>{data.name}</span>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="prog_list-status">
                            <span>Trạng thái hoạt động</span>
                            <div className="dropdown prog_list-dropdown" onClick={() => setActiveStatusOptions(!activeStatusOptions)}>
                                {statusOption}
                                <IoMdArrowDropdown />
                                <div className={!activeStatusOptions ? "dropdown_list hide" : "dropdown_list "}>
                                    <span onClick={() => handleStatusOptions('Tất cả')}>Tất cả</span>
                                    <span onClick={() => handleStatusOptions('Đã sử dụng')}>Đã sử dụng</span>
                                    <span onClick={() => handleStatusOptions('Đang chờ')}>Đang chờ</span>
                                    <span onClick={() => handleStatusOptions('Bỏ qua')}>Bỏ qua</span>
                                </div>
                            </div>
                        </div>
                        <div className="prog_list-status">
                            <span>Nguồn cấp</span>
                            <div className="dropdown prog_list-dropdown" onClick={() => setActiveSourceOptions(!activeSourceOptions)}>
                                {sourceOption}
                                <IoMdArrowDropdown />
                                <div className={!activeSourceOptions ? "dropdown_list hide" : "dropdown_list "}>
                                    <span onClick={() => handleSourceOptions('Tất cả')}>Tất cả</span>
                                    <span onClick={() => handleSourceOptions('Kiosk')}>Kiosk</span>
                                    <span onClick={() => handleSourceOptions('Hệ thống')}>Hệ thống</span>
                                </div>
                            </div>
                        </div>
                        <div className="prog_list-date">
                            <span>Chọn thời gian</span>
                            <div className='prog_list-date-range'>
                                <DatePicker className='date_picker' placeholder='Chọn ngày'
                                    onChange={(date, dateString) => setDate(prev => ({ ...prev, start: dateString }))} />
                                <AiFillCaretRight style={{ color: 'var(--primary-color)' }} />
                                <DatePicker className='date_picker' placeholder='Chọn ngày'
                                    onChange={(date, dateString) => setDate(prev => ({ ...prev, end: dateString }))} />
                            </div>
                        </div>
                        <div className="prog_list-search">
                            <span>Từ khóa </span>
                            <Search setSearchInput={setSearchInput}/>
                        </div>
                    </div>
                    {/* Table */}
                    <div className="prog_list-table">
                        <Table dataSource={customerList} columns={columns} pagination={{ pageSize: 10 }} />
                    </div>
                </div>
                {/* Sub */}
                <div className="prog_list-sub">
                    <div className="main_btn" onClick={() => {
                        const userRole = roleList.find(role => role.name === currUser.role)
                        if (!userRole?.role.A.customer) {
                            alert('Không có quyền thực hiện chức năng này!')
                            return
                        }
                        setCurrTopic('prog_add')
                    }}>
                        <div className="main_btn-icon">
                            <AiOutlinePlus />
                        </div>
                        Cấp số mới
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgList
