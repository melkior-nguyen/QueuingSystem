import React, { ReactElement, useState } from 'react'
import './servicelist.css'
import { IoMdArrowDropdown } from 'react-icons/io'
import { Search } from '../../../Components'
import { DatePicker, Table } from 'antd'
import { serviceData } from '../../../testdata'
import { AiFillCaretRight, AiOutlinePlus } from 'react-icons/ai'
import { GoDotFill } from 'react-icons/go'

function ServiceList({ setCurrTopic, setCurrService }: any) {
    const [activeStatusOptions, setActiveStatusOptions] = useState<boolean>(false)
    const [statusOption, setStatusOption] = useState<string>('Tất cả')

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
                            setCurrService(record)
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
                            <span>Trạng thái kết nối</span>
                            <div className='service_list-date-range'>
                                <DatePicker className='date_picker' placeholder='Chọn ngày' />
                                <AiFillCaretRight style={{ color: 'var(--primary-color)' }} />
                                <DatePicker className='date_picker' placeholder='Chọn ngày' />
                            </div>
                        </div>
                        <div className="service_list-search">
                            <span>Từ khóa </span>
                            <Search />
                        </div>
                    </div>
                    {/* Table */}
                    <div className="service_list-table">
                        <Table dataSource={serviceData} columns={columns} pagination={{ pageSize: 9 }} />
                    </div>
                </div>
                {/* Sub */}
                <div className="service_list-sub">
                    <div className="main_btn" onClick={() => setCurrTopic('service_add')}>
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
