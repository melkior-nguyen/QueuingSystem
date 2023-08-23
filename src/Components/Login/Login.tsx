import React, { useEffect, useState } from 'react'
import './login.css'
import { BiErrorCircle } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../Redux/store'
import { fetchUsers, updateCurrentUser, updatePassword } from '../../Redux/slice/userSlice'
import { userType } from '../../type'


function Login({ setActiveLoginLayout, setLoggedIn }: any) {
    const [loginReset, setloginReset] = useState<boolean>(false)
    const [loginNew, setloginNew] = useState<boolean>(false)
    const [loginError, setLoginError] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<
        {
            username: string,
            password: string,
            email: string,
            newPassword: string,
            reNewPassword: string
        }>
        (
            {
                username: '',
                password: '',
                email: '',
                newPassword: '',
                reNewPassword: ''
            })
    const [currUserId, setCurrUserId] = useState<number>(0)


    const userList = useAppSelector(state => state.users.usersList)
    const distpach = useAppDispatch()
    useEffect(() => {
        distpach(fetchUsers())
    }, [distpach])


    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        userList.forEach(user => {
            if (user.username === userInfo.username &&
                user.password === userInfo.password) {
                distpach(updateCurrentUser(user))
                alert(`Xin chào ${user.name}!`)
                setActiveLoginLayout(false)
                setLoggedIn(true)
            } else {
                setLoginError(true)
                return
            }
        })
    }

    const handleResetPassword = () => {
        userList.forEach((user, index) => {
            if (user.email === userInfo.email) {
                setloginNew(true);
                setloginReset(false)
                setLoginError(false)
                setCurrUserId(index)
            } else {
                setLoginError(true)
                return
            }
        })
    }

    const handleNewPassword = () => {
        if (userInfo.newPassword === userInfo.reNewPassword
            && userInfo.newPassword !== '') {
            const newPassword = {
                id: currUserId,
                newPassword: userInfo.newPassword
            }
            distpach(updatePassword(newPassword))
            setloginReset(false);
            setloginNew(false);
            alert('Thay đổi mật khẩu thành công!')
        } else {
            setLoginError(true)
            return
        }

    }

    return (
        <div className='login'>
            {/* login form */}
            <form onSubmit={(e) => handleLoginSubmit(e)} className="login_form">
                <div className="login_form-logo">
                    <img src={require('../../access/image/logo.png')} alt="" />
                </div>


                {!loginReset && !loginNew &&
                    <>
                        <div className="login_form-inputs">
                            <span>Tên đăng nhập *</span>
                            <input type="text" required
                                className={loginError ? 'login_form-input error' : 'login_form-input'}
                                onChange={(e) => {
                                    setUserInfo(prev => ({ ...prev, username: e.target.value }))
                                    setLoginError(false)
                                }} />
                            <span>Mật khẩu *</span>
                            <input type="password" required
                                className={loginError ? 'login_form-input error' : 'login_form-input'}
                                onChange={(e) => {
                                    setUserInfo(prev => ({ ...prev, password: e.target.value }))
                                    setLoginError(false)
                                }} />
                            {loginError ?
                                <span className='login_form-error-noti'>
                                    <BiErrorCircle />
                                    Sai mật khẩu hoặc tên đăng nhập.
                                </span> :
                                <span className='login_form-error-noti'>
                                    * Bắt buộc
                                </span>

                            }
                        </div>

                        <div className="login_form-submit">
                            <button type='submit' className='btn primary'>Đăng nhập</button>
                            <p onClick={() => setloginReset(true)}>Quên mật khẩu ?</p>
                        </div>
                    </>
                }
                {loginReset &&
                    <>
                        <div className="login_form-inputs">
                            <strong>Đặt lại mật khẩu</strong>
                            <span>Vui lòng nhập email để đặt lại mật khẩu của bạn *</span>
                            <input type="email" required
                                className={loginError ? 'login_form-input error' : 'login_form-input'}
                                onChange={(e) => {
                                    setUserInfo(prev => ({ ...prev, email: e.target.value }))
                                    setLoginError(false)
                                }} />
                            {loginError ?
                                <span className='login_form-error-noti'>
                                    <BiErrorCircle />
                                    Email không tồn tại, vui lòng kiểm tra!
                                </span> :
                                <span className='login_form-error-noti'>
                                    * Bắt buộc
                                </span>

                            }
                        </div>
                        <div className="login_form-submit reset">
                            <button type='button' className='btn outline'
                                onClick={() => {
                                    setloginReset(false)
                                    setLoginError(false)
                                }}>Hủy
                            </button>
                            <button type='button' className='btn primary'
                                onClick={handleResetPassword}>Tiếp tục
                            </button>

                        </div>
                    </>
                }
                {loginNew &&
                    <>
                        <div className="login_form-inputs">
                            <strong>Đặt lại mật khẩu mới</strong>
                            <span>Mật khẩu</span>
                            <input type="password" required
                                className={loginError ? 'login_form-input error' : 'login_form-input'}
                                onChange={(e) => {
                                    setUserInfo(prev => ({ ...prev, newPassword: e.target.value }))
                                    setLoginError(false)
                                }} />
                            <span>Nhập lại mật khẩu</span>
                            <input type="password" required
                                className={loginError ? 'login_form-input error' : 'login_form-input'}
                                onChange={(e) => {
                                    setUserInfo(prev => ({ ...prev, reNewPassword: e.target.value }))
                                    setLoginError(false)
                                }} />
                            {loginError ?
                                <span className='login_form-error-noti'>
                                    <BiErrorCircle />
                                    Password không giống nhau hoặc bỏ trống!
                                </span> :
                                <span className='login_form-error-noti'>
                                    <BiErrorCircle />
                                </span>

                            }
                        </div>
                        <div className="login_form-submit">
                            <button type='button' className='btn primary'
                                onClick={handleNewPassword}
                            >Xác nhận</button>
                        </div>
                    </>
                }


            </form>

            {/* login detal */}
            <div className="login_picture">
                <div className="login_picture-wrap">
                    {loginReset ?
                        <img src={require('../../access/image/authen.png')} alt="" /> :
                        <img src={require('../../access/image/login.png')} alt="" />
                    }
                </div>
                {!loginReset &&
                    <p className='login_picture-detail'>
                        <span>Hệ thống</span><br />
                        <strong>QUẢN LÝ XẾP HÀNG</strong>
                    </p>
                }
            </div>

            <button
                type='button'
                onClick={() => setActiveLoginLayout(false)}
                className='login_form-cancel'
            >&times;
            </button>
        </div>
    )
}

export default Login
