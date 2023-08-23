import React, { useState, useEffect } from 'react'
import './systemhistory.css'
import { AiFillCaretRight, AiOutlineRight } from 'react-icons/ai'
import { userType } from '../../../type'
import { IoMdArrowDropdown } from 'react-icons/io'
import { DatePicker, Table } from 'antd'
import { Search } from '../../../Components'
import { historyData } from '../../../testdata'
import { useAppDispatch, useAppSelector } from '../../../Redux/store'
import { fetchHistorys } from '../../../Redux/slice/historySlice'
import dayjs from 'dayjs'

function SystemHistory() {
  const historyList = useAppSelector(state => state.history.historyList)
  const [date, setDate] = useState<{ start: string, end: string }>({ start: '', end: '' })
  const [searchInput, setSearchInput] = useState<string>('')

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchHistorys())
  }, [dispatch])

  console.log(historyList)

  const columns = [
    {
      title: 'Tên đăng nhập',
      key: 'username',
      dataIndex: 'username'
    },
    {
      title: 'Thời gian tác động',
      key: 'time',
      dataIndex: 'time',
      filteredValue: [date.start, date.end],
      onFilter: (value: any, record: any): any => {
        const recordDate = dayjs(record.time, 'DD/MM/YYYY HH:mm:ss')
        const startDate = dayjs(date.start, 'YYYY-MM-DD')
        const endDate = dayjs(date.end, 'YYYY-MM-DD')
        if (date.start === '' && date.end === '') return record.time
        if (date.start === '' && recordDate.isBefore(endDate)) return record.time
        if (date.end === '' && recordDate.isAfter(startDate)) return record.time
        if (recordDate.isBefore(endDate) && recordDate.isAfter(startDate)) return record.time
      },
      sorter: (a: any, b: any) => {
        return a.id - b.id
      }
    },
    {
      title: 'IP thực hiện',
      key: 'ip',
      dataIndex: 'ip'
    },
    {
      title: 'Thao tác thực hiện',
      key: 'action',
      dataIndex: 'action',
      filteredValue: [searchInput],
      onFilter: (value: any, record: any) => {
        if (value !== '') {
          return record.action.toLowerCase().indexOf(value.toLowerCase()) !== -1
        }
        else return record.action
      }
    }
  ]

  return (
    <div className='main_content'>
      <h3 className='top_content'>
        {/* change topic change top content */}
        <span>Cài đặt hệ thống </span>
        <AiOutlineRight />
        <span className='current'
          style={{ cursor: 'pointer' }}
        >Nhật ký hoạt động</span>
      </h3>
      <div className="history_list-wrap">
        <h3 className='content_title'>Quản lý cấp số</h3>
        <div className="history_list">
          {/* Main */}
          <div className="history_list-main">
            {/* Navbar */}
            <div className="history_list-nav">
              <div className="history_list-date">
                <span>Chọn thời gian</span>
                <div className='history_list-date-range'>
                  <DatePicker className='date_picker' placeholder='Chọn ngày'
                    onChange={(date, dateString) => setDate(prev => ({ ...prev, start: dateString }))} />
                  <AiFillCaretRight style={{ color: 'var(--primary-color)' }} />
                  <DatePicker className='date_picker' placeholder='Chọn ngày'
                    onChange={(date, dateString) => setDate(prev => ({ ...prev, end: dateString }))} />
                </div>
              </div>
              <div className="history_list-search">
                <span>Từ khóa </span>
                <Search setSearchInput={setSearchInput} />
              </div>
            </div>
            {/* Table */}
            <div className="history_list-table">
              <Table dataSource={historyList} columns={columns} pagination={{ pageSize: 10 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemHistory
