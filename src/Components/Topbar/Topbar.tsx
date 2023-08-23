import React, { useEffect, useState } from 'react'
import './topbar.css'
import { BiSolidBell } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../Redux/store'
import { fetchCurrUser } from '../../Redux/slice/userSlice'
import { fetchHistorys } from '../../Redux/slice/historySlice'
import dayjs from 'dayjs'

function Topbar() {
    const currUser = useAppSelector(state => state.users.currUser)
    const historyList = useAppSelector(state => state.history.historyList)
    const distpach = useAppDispatch()

    useEffect(() => {
        distpach(fetchCurrUser())
        distpach(fetchHistorys())
    }, [distpach])

    const [activeNotiBox, setActiveNotiBox] = useState<boolean>(false)

    return (
        <div className="topbar">
            <div className="topbar_noti" onClick={() => setActiveNotiBox(!activeNotiBox)}>
                <BiSolidBell />
                {activeNotiBox &&
                    <div className="noti_box">
                        <h3>Thông báo</h3>
                        <div className="noti_box-list">
                            {historyList.map((history, index) => {
                                return (
                                    <div key={index}>
                                        <span>Người dùng: {history.name}</span>
                                        <p>{history.action} vào lúc {history.time}</p>
                                    </div>
                                )
                            }).sort((a: any, b: any): any => dayjs(a.time_get, 'HH:mm-DD/MM/YYYY').isAfter(dayjs(b.time_get, 'HH:mm-DD/MM/YYYY')) ? 1 : -1)}
                        </div>
                    </div>
                }

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
