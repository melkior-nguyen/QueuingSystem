import React, { useState } from 'react'
import './login.css'


function Login({ setActiveLoginLayout, setLoggedIn }: any) {
    const [loginReset, setloginReset] = useState<boolean>(false)
    const [loginNew, setloginNew] = useState<boolean>(false)


    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert('Xin chào Nguyễn Minh Hiếu!')
        setActiveLoginLayout(false)
        setLoggedIn(true)
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
                            <input type="text" />
                            <span>Mật khẩu *</span>
                            <input type="password" />
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
                            <input type="email" />
                        </div>
                        <div className="login_form-submit reset">
                            <button type='button' className='btn outline'
                                onClick={() => setloginReset(false)}
                            >Hủy</button>
                            <button type='button' className='btn primary'
                                onClick={() => { setloginNew(true); setloginReset(false) }}
                            >Tiếp tục</button>
                        </div>
                    </>
                }
                {loginNew &&
                    <>
                        <div className="login_form-inputs">
                            <strong>Đặt lại mật khẩu mới</strong>
                            <span>Mật khẩu</span>
                            <input type="password" />
                            <span>Nhập lại mật khẩu</span>
                            <input type="password" />
                        </div>
                        <div className="login_form-submit">
                            <button type='button' className='btn primary'
                                onClick={() => {
                                    setloginReset(false);
                                    setloginNew(false);
                                    alert('Thay đổi mật khẩu thành công!')
                                }}
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
