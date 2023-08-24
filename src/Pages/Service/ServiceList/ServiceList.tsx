import React, { ReactElement, useState, useEffect } from 'react'
import './servicelist.css'
import { IoMdArrowDropdown } from 'react-icons/io'
import { Search } from '../../../Components'
import { DatePicker, Table } from 'antd'
import { AiFillCaretRight, AiOutlinePlus } from 'react-icons/ai'
import { GoDotFill } from 'react-icons/go'
import { useAppDispatch, useAppSelector } from '../../../Redux/store'
import { fetchServices } from '../../../Redux/slice/serviceSlice'
import { fetchCurrUser } from '../../../Redux/slice/userSlice'
import { fetchRoles } from '../../../Redux/slice/roleSlice'

function ServiceList({ setCurrTopic, setCurrService, setCurrIndex }: any) {
    const currUser = useAppSelector(state => state.users.currUser)
    const roleList = useAppSelector(state => state.role.roleList)
    const serviceList = useAppSelector(state => state.service.serviceList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchServices())
    }, [dispatch])
    useEffect(() => {
        dispatch(fetchCurrUser())
    }, [dispatch])
    useEffect(() => {
        dispatch(fetchRoles())
    }, [dispatch])

    const [activeStatusOptions, setActiveStatusOptions] = useState<boolean>(false)
    const [statusOption, setStatusOption] = useState<string>('Tất cả')

    const [searchInput, setSearchInput] = useState<string>('')

    const handleStatusOptions = (option: string) => {
        setStatusOption(option)
        setActiveStatusOptions(false)
    }

    //handle table
    const columns = [
        {
            title: 'Mã dịch vụ',
            key: 'code',
            dataIndex: 'code',
        },
        {
            title: 'Tên dịch vụ',
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
            title: 'Mô tả',
            key: 'desc',
            dataIndex: 'desc',
            render: (text: any, record: any, index: number): ReactElement => {
                return (
                    <span style={{ display: 'block', whiteSpace: 'nowrap', width: '20rem', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >{text}</span>
                )
            }
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
            render: (text: any, record: any, index: number): ReactElement => {
                if (text === 200) return <span className="align_center"><GoDotFill style={{ color: 'green' }} />Hoạt động</span>
                if (text === 404) return <span className="align_center"><GoDotFill style={{ color: 'red' }} />Ngưng hoạt động</span>
                return <span>---</span>
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
                            setCurrService(record)
                            setCurrTopic('service_detail')
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
                            if (!userRole?.role.A.service) {
                                alert('Không có quyền thực hiện chức năng này!')
                                return
                            }
                            setCurrService(record)
                            setCurrIndex(index)
                            setCurrTopic('service_update')
                        }}
                    >Cập nhật</span>
                )
            }
        },
    ]
    return (
        <div className="service_list-wrap">
            <h3 className='content_title'>Danh sách dịch vụ</h3>
            <div className="service_list">
                {/* Main */}
                <div className="service_list-main">
                    {/* Navbar */}
                    <div className="service_list-nav">
                        <div className="service_list-status">
                            <span>Trạng thái hoạt động</span>
                            <div className="dropdown service_list-dropdown" onClick={() => setActiveStatusOptions(!activeStatusOptions)}>
                                {statusOption}
                                <IoMdArrowDropdown />
                                <div className={!activeStatusOptions ? "dropdown_list hide" : "dropdown_list "}>
                                    <span onClick={() => handleStatusOptions('Tất cả')}>Tất cả</span>
                                    <span onClick={() => handleStatusOptions('Hoạt động')}>Hoạt động</span>
                                    <span onClick={() => handleStatusOptions('Ngưng hoạt động')}>Ngưng hoạt động</span>
                                </div>
                            </div>
                        </div>
                        <div className="service_list-date">
                            <span>Chọn thời gian</span>
                            <div className='service_list-date-range'>
                                <DatePicker className='date_picker' placeholder='Chọn ngày' />
                                <AiFillCaretRight style={{ color: 'var(--primary-color)' }} />
                                <DatePicker className='date_picker' placeholder='Chọn ngày' />
                            </div>
                        </div>
                        <div className="service_list-search">
                            <span>Từ khóa </span>
                            <Search setSearchInput={setSearchInput} />
                        </div>
                    </div>
                    {/* Table */}
                    <div className="service_list-table">
                        <Table dataSource={serviceList} columns={columns} pagination={{ pageSize: 10 }} />
                    </div>
                </div>
                {/* Sub */}
                <div className="service_list-sub">
                    <div className="main_btn" onClick={() => {
                        const userRole = roleList.find(role => role.name === currUser.role)
                        if (!userRole?.role.A.service) {
                            alert('Không có quyền thực hiện chức năng này!')
                            return
                        }
                        setCurrTopic('service_add')
                    }}>

                        <div className="main_btn-icon">
                            <AiOutlinePlus />
                        </div>
                        Thêm dịch vụ
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceList
