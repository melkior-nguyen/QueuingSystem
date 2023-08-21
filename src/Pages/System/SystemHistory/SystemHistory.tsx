import React, { useState } from 'react'
import './systemhistory.css'
import { AiFillCaretRight, AiOutlineRight } from 'react-icons/ai'
import { userType } from '../../../type'
import { IoMdArrowDropdown } from 'react-icons/io'
import { DatePicker, Table } from 'antd'
import { Search } from '../../../Components'
import { historyData } from '../../../testdata'

function SystemHistory() {

  const columns = [
    {
      title: 'Tên đăng nhập',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: 'Thời gian tác động',
      key: 'time',
      dataIndex: 'time',
    },
    {
      title: 'IP thực hiện',
      key: 'ip',
      dataIndex: 'ip'
    },
    {
      title: 'Thao tác thực hiện',
      key: 'action',
      dataIndex: 'action'
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
                  <DatePicker className='date_picker' placeholder='Chọn ngày' />
                  <AiFillCaretRight style={{ color: 'var(--primary-color)' }} />
                  <DatePicker className='date_picker' placeholder='Chọn ngày' />
                </div>
              </div>
              <div className="history_list-search">
                <span>Từ khóa </span>
                <Search />
              </div>
            </div>
            {/* Table */}
            <div className="history_list-table">
              <Table dataSource={historyData} columns={columns} pagination={{ pageSize: 10 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemHistory
