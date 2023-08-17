import React, { ReactElement } from 'react'
import './reportlist.css'
import { customerData } from '../../../testdata'
import { DatePicker, Table } from 'antd'
import { AiFillCaretRight } from 'react-icons/ai'
import { BsFileEarmarkArrowDownFill } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'

function ReportList() {


    const columns = [
        {
            title: 'Số thứ tự',
            key: 'number',
            dataIndex: 'number',
            sorter: (a: any, b: any) => {
                return a.number - b.number
            },
        },
        {
            title: 'Tên dịch vụ',
            key: 'service',
            dataIndex: 'service',
            sorter: (a: any, b: any) => {
                return a.service.localeCompare(b.service);
            },
        },
        {
            title: 'Thời gian cấp',
            key: 'time_get',
            dataIndex: 'time_get',
            sorter: (a: any, b: any) => {
                return a.time_get - b.time_get
            },
        },
        {
            title: 'Tình trạng',
            key: 'status',
            dataIndex: 'status',
            render: (text: any, record: any, index: number): ReactElement => {
                if (text === 200) return <span className="align_center"><GoDotFill style={{ color: 'gray' }} />Đã sử dụng</span>
                if (text === 300) return <span className="align_center"><GoDotFill style={{ color: 'blue' }} />Đang chờ</span>
                if (text === 404) return <span className="align_center"><GoDotFill style={{ color: 'red' }} />Bỏ qua</span>
                return <span>---</span>
            },
            sorter: (a: any, b: any) => {
                return a.status - b.status
            },
        },
        {
            title: 'Nguồn cấp',
            key: 'source',
            dataIndex: 'source',
            sorter: (a: any, b: any) => {
                return a.source.localeCompare(b.source);
            },
        }
    ]
    return (
        <div className="report_list-wrap">
            <h3 className='content_title'>Danh sách báo cáo</h3>
            <div className="report_list">
                {/* Main */}
                <div className="report_list-main">
                    {/* Navbar */}
                    <div className="report_list-nav">
                        <div className="report_list-date">
                            <span>Chọn thời gian</span>
                            <div className='report_list-date-range'>
                                <DatePicker className='date_picker' placeholder='Chọn ngày' />
                                <AiFillCaretRight style={{ color: 'var(--primary-color)' }} />
                                <DatePicker className='date_picker' placeholder='Chọn ngày' />
                            </div>
                        </div>
                    </div>
                    {/* Table */}
                    <div className="report_list-table">
                        <Table dataSource={customerData} columns={columns} pagination={{ pageSize: 10 }} />
                    </div>
                </div>
                {/* Sub */}
                <div className="report_list-sub">
                    <div className="main_btn">
                        <div className="main_btn-icon">
                            <BsFileEarmarkArrowDownFill />
                        </div>
                        Tải về
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportList
