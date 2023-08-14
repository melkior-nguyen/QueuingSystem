import React from 'react'
import './progdetail.css'
import { RiArrowGoBackFill } from 'react-icons/ri'

function ProgDetail({ currProg, setCurrTopic }: any) {
  return (
    <div className="prog_detail-wrap">
      <h3 className='content_title'>Quản lý cấp số</h3>
      <div className="prog_detail">
        {/* Main */}
        <div className="prog_detail-main">
          <h3>Thông tin cấp số</h3>
          <div className="prog_detail-list">
            <p>
              <strong>Họ và tên: </strong>
              <span>{currProg.name}</span>
            </p>
            <p>
              <strong> Nguồn cấp: </strong>
              <span>{currProg.source}</span>
            </p>
            <p>
              <strong>Tên dịch vụ: </strong>
              <span>{currProg.service}</span>
            </p>
            <p>
              <strong>Trạng thái: </strong>
              {currProg.status === 200 && <span>Đã sử dụng</span>}
              {currProg.status === 300 && <span>Đang chờ</span>}
              {currProg.status === 404 && <span>Bỏ qua</span>}
            </p>
            <p>
              <strong>Số thứ tự: </strong>
              <span>{currProg.number}</span>
            </p>
            <p>
              <strong>Số điện thoại: </strong>
              <span>0123456789</span>
            </p>
            <p>
              <strong>Thời gian cấp:</strong>
              <span>{currProg.time_get}</span>
            </p>
            <p>
              <strong>Địa chỉ email:</strong>
              <span>user1@gmail.com</span>
            </p>
            <p>
              <strong>Hạn sử dụng:</strong>
              <span>{currProg.time_expired}</span>
            </p>
          </div>
        </div>
        {/* Sub */}
        <div className="prog_detail-sub">
          <div className="main_btn" onClick={() => setCurrTopic('prog_list')}>
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

export default ProgDetail
