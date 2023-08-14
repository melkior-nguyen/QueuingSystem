import React, { ReactElement, useState } from 'react'
import './servicedetail.css'
import { AiFillCaretRight, AiOutlinePlus } from 'react-icons/ai'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { DatePicker, Table } from 'antd'
import { Search } from '../../../Components'
import { GoDotFill } from 'react-icons/go'

function ServiceDetail({ currservice, setCurrTopic }: any) {
    const [activeDetailOptions, setActiveDetailOptions] = useState<boolean>(false)
    const [detailOption, setDetailOption] = useState<string>('Tất cả')

    const handleDetailOption = (option: string) => {
        setDetailOption(option)
    }

    const testData = [
        {
            key: '20230001',
            number: 20230001,
            status: 200
        },
        {
            key: '20230002',
            number: 20230002,
            status: 200
        },
        {
            key: '20230003',
            number: 20230003,
            status: 300
        },
        {
            key: '20230004',
            number: 20230004,
            status: 200
        },
        {
            key: '20230005',
            number: 20230005,
            status: 404
        },
        {
            key: '20230006',
            number: 20230006,
            status: 200
        },
        {
            key: '20230007',
            number: 20230007,
            status: 200
        },
        {
            key: '20230008',
            number: 20230008,
            status: 200
        },
        {
            key: '20230009',
            number: 20230009,
            status: 300
        },
        {
            key: '20230010',
            number: 20230010,
            status: 300
        }
    ]

    const columns = [
        {
            key: 'Số thứ tự',
            title: 'Số thứ tự',
            dataIndex: 'number'
        },
        {
            key: 'Trạng thái',
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (text: number, record: any): ReactElement => {
                if (text === 200) return <span className="align_center"><GoDotFill style={{ color: 'green' }} />Đã hoàn thành</span>
                if (text === 300) return <span className="align_center"><GoDotFill style={{ color: 'blue' }} />Đang thực hiện</span>
                if (text === 404) return <span className="align_center"><GoDotFill style={{ color: 'gray' }} />Vắng</span>
                return <span>---</span>
            }
        }
    ]

    return (
        <div className="service_detail-wrap">
            <h3 className='content_title'>Danh sách dịch vụ</h3>
            <div className="service_detail">
                {/* Main */}
                <div className="service_detail-main">
                    <div className="service_detail-info">
                        <h3>Thông tin dịch vụ</h3>
                        <p>
                            <strong>Mã thiết bị: </strong>
                            <span>{currservice.code}</span>
                        </p>
                        <p>
                            <strong>Tên dịch vụ: </strong>
                            <span>{currservice.name}</span>
                        </p>
                        <p>
                            <strong>Mô tả: </strong>
                            <span>{currservice.desc}</span>
                        </p>
                        <h3>Quy tắc cấp số</h3>
                        {currservice.progRule.auto.start !== 'none' &&
                            <div className="service_detail-progression-rule">
                                <span>Tăng tự động từ</span>
                                <p>0001</p>
                                <span style={{ width: 'max-content' }}>đến</span>
                                <p>9999</p>
                            </div>
                        }
                        {currservice.progRule.prefix !== 'none' &&
                            <div className="service_detail-progression-rule">
                                <span>Prefix</span>
                                <p>{currservice.progRule.prefix}</p>
                            </div>
                        }
                        {currservice.progRule.surfix !== 'none' &&
                            <div className="service_detail-progression-rule">
                                <span>Surfix</span>
                                <p>{currservice.progRule.surfix}</p>
                            </div>
                        }
                        {currservice.progRule.reset &&
                            <div className="service_detail-progression-rule">
                                <span>Reset mỗi ngày</span>
                            </div>
                        }
                    </div>
                    <div className="service_detail-table-wrap">
                        <div className="service_detail-nav">
                            <div className="service_detail-dropdown">
                                <span>Trạng thái</span>
                                <div className="dropdown" onClick={() => setActiveDetailOptions(!activeDetailOptions)}>
                                    {detailOption}
                                    <div className={!activeDetailOptions ? "dropdown_list hide" : "dropdown_list "}>
                                        <span onClick={() => handleDetailOption('Tất cả')}>Tất cả</span>
                                        <span onClick={() => handleDetailOption('Đã hoàn thành')}>Đã hoàn thành</span>
                                        <span onClick={() => handleDetailOption('Đang thực hiện')}>Đang thực hiện</span>
                                        <span onClick={() => handleDetailOption('Vắng')}>Vắng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="service_detail-date">
                                <span>Chọn thời gian</span>
                                <div className="service_detail-date-range">
                                    <DatePicker className='date_picker' placeholder='Chọn ngày' />
                                    <AiFillCaretRight style={{ color: 'var(--primary-color)' }} />
                                    <DatePicker className='date_picker' placeholder='Chọn ngày' />
                                </div>
                            </div>
                            <div className="service_detail-search">
                                <span>Từ khóa</span>
                                <Search />
                            </div>
                        </div>
                        <div className="service_detail-table">
                            <Table dataSource={testData} columns={columns} pagination={{ pageSize: 10 }} />
                        </div>
                    </div>
                </div>
                {/* Sub */}
                <div className="service_detail-sub">
                    <div className="main_btn" onClick={() => setCurrTopic('service_update')}>
                        <div className="main_btn-icon">
                            <AiOutlinePlus />
                        </div>
                        Cập nhật dịch vụ
                    </div>
                    <div className="main_btn" onClick={() => setCurrTopic('service_list')}>
                        <div className="main_btn-icon">
                            <RiArrowGoBackFill />
                        </div>
                        Quay lại
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceDetail
