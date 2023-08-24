import React, { ReactElement, useState, useEffect } from 'react'
import './servicedetail.css'
import { AiFillCaretRight, AiOutlinePlus } from 'react-icons/ai'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { DatePicker, Table } from 'antd'
import { Search } from '../../../Components'
import { GoDotFill } from 'react-icons/go'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useAppDispatch, useAppSelector } from '../../../Redux/store'
import { fetchCurrUser } from '../../../Redux/slice/userSlice'
import { fetchRoles } from '../../../Redux/slice/roleSlice'
import { fetchCustomer } from '../../../Redux/slice/customerSlice'

function ServiceDetail({ currService, setCurrTopic }: any) {
    const currUser = useAppSelector(state => state.users.currUser)
    const roleList = useAppSelector(state => state.role.roleList)
    const customerList = useAppSelector(state => state.customer.customerList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCurrUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchCustomer())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchRoles())
    }, [dispatch])

    const [activeDetailOptions, setActiveDetailOptions] = useState<boolean>(false)
    const [detailOption, setDetailOption] = useState<string>('Tất cả')

    const handleDetailOption = (option: string) => {
        setDetailOption(option)
    }

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
            filteredValue: [detailOption],
            onFilter: (value: any, record: any) => {
                if (value === 'Tất cả') return record.status
                if (value === 'Đã hoàn thành') return record.status === 200
                if (value === 'Đang thực hiện') return record.status === 300
                if (value === 'Vắng') return record.status === 404
                return record.status
            },
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
                            <span>{currService.code}</span>
                        </p>
                        <p>
                            <strong>Tên dịch vụ: </strong>
                            <span>{currService.name}</span>
                        </p>
                        <p>
                            <strong>Mô tả: </strong>
                            <span>{currService.desc}</span>
                        </p>
                        <h3>Quy tắc cấp số</h3>
                        {currService.progRule.auto.start !== 'none' &&
                            <div className="service_detail-progression-rule">
                                <span>Tăng tự động từ</span>
                                <p>0001</p>
                                <span style={{ width: 'max-content' }}>đến</span>
                                <p>9999</p>
                            </div>
                        }
                        {currService.progRule.prefix !== 'none' &&
                            <div className="service_detail-progression-rule">
                                <span>Prefix</span>
                                <p>{currService.progRule.prefix}</p>
                            </div>
                        }
                        {currService.progRule.surfix !== 'none' &&
                            <div className="service_detail-progression-rule">
                                <span>Surfix</span>
                                <p>{currService.progRule.surfix}</p>
                            </div>
                        }
                        {currService.progRule.reset &&
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
                                    <IoMdArrowDropdown />
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
                            <Table dataSource={customerList.filter(cus => cus.service === currService.name)} columns={columns} pagination={{ pageSize: 8 }} />
                        </div>
                    </div>
                </div>
                {/* Sub */}
                <div className="service_detail-sub">
                    <div className="main_btn" onClick={() => {
                        const userRole = roleList.find(role => role.name === currUser.role)
                        if (!userRole?.role.A.service) {
                            alert('Không có quyền thực hiện chức năng này!')
                            return
                        }
                        setCurrTopic('service_update')
                    }}>
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
