import React, { useEffect } from 'react'
import './user.css'
import { useAppDispatch, useAppSelector } from '../../Redux/store'
import { fetchCurrUser } from '../../Redux/userslice'

function User() {
  const currUser = useAppSelector(state => state.users.currUser)
  const distpach = useAppDispatch()

  useEffect(() => {
    distpach(fetchCurrUser())
  }, [distpach])


  return (
    <div className='main_content user'>
      {currUser.username !== '' ?
        <div className="user_content">

          <div className="user_ava-wrap">
            <div className="user_ava">
              <img src={currUser.avatar} alt="" />
            </div>
            <span>{currUser.name}</span>
          </div>

          <div className="user_infos">
            <div className="user_info">
              <span>Tên người dùng</span>
              <p>{currUser.name}</p>
            </div>

            <div className="user_info">
              <span>Tên đăng nhập</span>
              <p>{currUser.username}</p>
            </div>

            <div className="user_info">
              <span>Số điện thoại</span>
              <p>{currUser.telephone}</p>
            </div>

            <div className="user_info">
              <span>Mật khẩu</span>
              <p>{currUser.password}</p>
            </div>

            <div className="user_info">
              <span>Email</span>
              <p>{currUser.email}</p>
            </div>

            <div className="user_info">
              <span>Vai trò</span>
              <p>{currUser.role}</p>
            </div>
          </div>
        </div> :
        <div className="user_content" style={{fontSize: '4rem'}}>
          Bạn đang đăng nhập với tài khoản khách
        </div>
      }
    </div>
  )
}

export default User
