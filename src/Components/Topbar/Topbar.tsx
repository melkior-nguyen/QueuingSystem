import React, { useEffect } from 'react'
import './topbar.css'
import { BiSolidBell } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../Redux/store'
import { fetchCurrUser } from '../../Redux/slice/userslice'

function Topbar() {
    const currUser = useAppSelector(state => state.users.currUser)
    const distpach = useAppDispatch()

    useEffect(() => {
        distpach(fetchCurrUser())
    }, [distpach])
    return (
        <div className="topbar">
            <div className="topbar_noti">
                <BiSolidBell />
            </div>
            <div className="topbar_ava">
                <Link to='/user' className='topbar_ava-link'>
                    <img src={currUser.username ? currUser.avatar : 'https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg'} alt="" />
                </Link>
                <span className='topbar_ava-hello'>
                    <small>Xin chào</small> <br />
                    <strong>{currUser.username ? currUser.name : ''}</strong>
                </span>
            </div>
        </div>
    )
}

export default Topbar
