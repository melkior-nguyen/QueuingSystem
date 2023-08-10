import React, { useEffect, useState } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { LuLayoutDashboard } from 'react-icons/lu'
import { TbDeviceDesktop } from 'react-icons/tb'
import { IoChatbubblesOutline } from 'react-icons/io5'
import { GoStack } from 'react-icons/go'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { TbSettings2 } from 'react-icons/tb'
import { BiDotsVerticalRounded } from 'react-icons/bi'

import { LuLogOut } from 'react-icons/lu'
import { LuLogIn } from 'react-icons/lu'
import { Login } from '../index'
import { updateCurrentUser } from '../../Redux/userslice'
import { useAppDispatch, useAppSelector } from '../../Redux/store'

function Navbar() {
  const currUser = useAppSelector(state => state.users.currUser)
  const distpach = useAppDispatch()
  const [activedLink, setActivedLink] = useState<number>(0)
  const [activedSubLink, setActivedSubLink] = useState<number>(1)
  //navbar option
  const [activedNavbarOption, setActivedNavbarOption] = useState<boolean>(false)
  // login layout
  const [activeLoginLayout, setActiveLoginLayout] = useState<boolean>(false)
  // login, logout status
  const [loggedIn, setLoggedIn] = useState<boolean>(currUser.username !== '')

  useEffect(() => {
    setLoggedIn(currUser.username !== '')
  }, [currUser])

  const handleActivedLink = (num: number) => {
    setActivedLink(num)
  }
  const handleActivedSubLink = (num: number) => {
    setActivedSubLink(num)
  }

  // reset current user info when log out
  const guest = {
    id: 0,
    name: '',
    email: '',
    username: '',
    password: '',
    role: '',
    telephone: 0,
    avatar: ''
  }
  // handle log out btn
  const handleLogOut = () => {
    const confirmLogOut = window.confirm('Bạn có thật sự muốn đăng xuất')
    if (confirmLogOut) {
      setLoggedIn(false)
      distpach(updateCurrentUser(guest))
    } else return
  }

  // handle log in btn
  const handleLogIn = () => {
    setActiveLoginLayout(true)
  }


  return (
    <div className='navbar'>
      <div className="navbar_logo" onClick={() => handleActivedLink(1)}>
        <img src={require('../../access/image/logo.png')} alt="" />
      </div>

      <Link
        to='/'
        className={activedLink === 1 ? ' navbar_link actived' : 'navbar_link'}
        onClick={() => handleActivedLink(1)}>
        <LuLayoutDashboard className='navbar_link-icon' />
        Dashboard
      </Link>

      <Link
        to='/device'
        className={activedLink === 2 ? ' navbar_link actived' : 'navbar_link'}
        onClick={() => handleActivedLink(2)}>
        <TbDeviceDesktop className='navbar_link-icon' />
        Thiết bị
      </Link>

      <Link
        to='/service'
        className={activedLink === 3 ? ' navbar_link actived' : 'navbar_link'}
        onClick={() => handleActivedLink(3)}>
        <IoChatbubblesOutline className='navbar_link-icon' />
        Dịch vụ
      </Link>

      <Link
        to='/progression'
        className={activedLink === 4 ? ' navbar_link actived' : 'navbar_link'}
        onClick={() => handleActivedLink(4)}>
        <GoStack className='navbar_link-icon' />
        Cấp số
      </Link>

      <Link
        to='/report'
        className={activedLink === 5 ? ' navbar_link actived' : 'navbar_link'}
        onClick={() => handleActivedLink(5)}>
        <HiOutlineDocumentReport className='navbar_link-icon' />
        Báo cáo
      </Link>

      <Link
        to='/system'
        className={activedLink === 6 ? ' navbar_link actived' : 'navbar_link'}
        onClick={() => handleActivedLink(6)}>
        <TbSettings2 className='navbar_link-icon' />
        Cài đặt hệ thống
        {activedLink === 6 &&
          <BiDotsVerticalRounded
            className={activedNavbarOption ? 'nabvar_link-sub-icon actived' : 'nabvar_link-sub-icon '}
            onClick={() => setActivedNavbarOption(!activedNavbarOption)} />
        }
        {activedLink === 6 && activedNavbarOption &&
          <div className="navbar_link-option">
            <span className={activedSubLink === 1 ? ' navbar_link-item actived' : 'navbar_link-item'}
              onClick={() => handleActivedSubLink(1)}
            >Quản lý vai trò</span>
            <span className={activedSubLink === 2 ? ' navbar_link-item actived' : 'navbar_link-item'}
              onClick={() => handleActivedSubLink(2)}
            >Quản lý tài khoản</span>
            <span className={activedSubLink === 3 ? ' navbar_link-item actived' : 'navbar_link-item'}
              onClick={() => handleActivedSubLink(3)}
            >Nhật ký người dùng</span>
          </div>
        }
      </Link>

      {loggedIn ?
        <button className='navbar_btn' onClick={handleLogOut}>
          <LuLogOut className='navbar_btn-icon' />
          Đăng xuất
        </button> :
        <button className='navbar_btn' onClick={handleLogIn}>
          <LuLogIn className='navbar_btn-icon' />
          Đăng nhập
        </button>
      }

      {activeLoginLayout &&
        <Login setActiveLoginLayout={setActiveLoginLayout} setLoggedIn={setLoggedIn} />
      }
    </div>
  )
}

export default Navbar
