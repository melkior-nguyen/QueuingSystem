import React, { useState, ReactElement } from 'react'
import './proglist.css'
import { GoDotFill } from 'react-icons/go'
import { IoMdArrowDropdown } from 'react-icons/io'
import { DatePicker, Table } from 'antd'
import { AiFillCaretRight, AiOutlinePlus } from 'react-icons/ai'
import { Search } from '../../../Components'
import { customerData, serviceData } from '../../../testdata'

function ProgList({ setCurrTopic, setCurrProg }: any) {
    const [activeStatusOptions, setActiveStatusOptions] = useState<boolean>(false)
    const [statusOption, setStatusOption] = useState<string>('Tất cả')

    const [activeServiceOptions, setActiveServiceOptions] = useState<boolean>(false)
    const [serviceOption, setServiceOption] = useState<string>('Tất cả')

    const [activeSourceOptions, setActiveSourceOptions] = useState<boolean>(false)
    const [sourceOption, setSourceOption] = useState<string>('Tất cả')

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
            dataIndex: 'time_expired'
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
                                    {serviceData.map(data => {
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
                                <DatePicker className='date_picker' placeholder='Chọn ngày' />
                                <AiFillCaretRight style={{ color: 'var(--primary-color)' }} />
                                <DatePicker className='date_picker' placeholder='Chọn ngày' />
                            </div>
                        </div>
                        <div className="prog_list-search">
                            <span>Từ khóa </span>
                            <Search />
                        </div>
                    </div>
                    {/* Table */}
                    <div className="prog_list-table">
                        <Table dataSource={customerData} columns={columns} pagination={{ pageSize: 10 }} />
                    </div>
                </div>
                {/* Sub */}
                <div className="prog_list-sub">
                    <div className="main_btn" onClick={() => setCurrTopic('prog_add')}>
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
