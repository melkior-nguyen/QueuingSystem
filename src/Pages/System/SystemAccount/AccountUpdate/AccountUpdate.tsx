import React, { useState, useEffect } from 'react'
import './accountupdate.css'
import { userType } from '../../../../type'
import { IoMdArrowDropdown } from 'react-icons/io'
import { systemRoleData } from '../../../../testdata'
import { useAppDispatch, useAppSelector } from '../../../../Redux/store'
import { updateUser } from '../../../../Redux/slice/userslice'
import { fetchRoles } from '../../../../Redux/slice/roleSlice'

function AccountUpdate({ setCurrTopic, currAccount, currIndex }: any) {
  const roleList = useAppSelector(state=> state.role.roleList)
  const dispatch = useAppDispatch()

  useEffect(()=> {
    dispatch(fetchRoles())
  },[])

  const [activeAccountRoleOption, setActiveAccountRoleOptions] = useState<boolean>(false)
  const [accountRoleOption, setAccountRoleOption] = useState<string>(currAccount.role)
  const [activeAccountStatusOption, setActiveAccountStatusOptions] = useState<boolean>(false)
  const [accountStatusOption, setAccountStatusOption] = useState<string>('Hoạt động')


  const [updateAccountInfo, setUpdateAccountInfo] = useState<userType>(
    {
      id: currAccount.id,
      name: currAccount.name,
      email: currAccount.email,
      username: currAccount.username,
      password: currAccount.password,
      role: currAccount.role,
      telephone: currAccount.telephone,
      avatar: currAccount.avatar,
      status: currAccount.status
    }
  )

  const [rePassword, setRePassword] = useState<string>(currAccount.password)

  const handleRoleOption = (option: string) => {
    setAccountRoleOption(option)
    setActiveAccountRoleOptions(false)
    setUpdateAccountInfo(prev => ({ ...prev, role: option }))
  }

  const handleStatusOption = (option: number) => {
    if (option === 200) setAccountStatusOption('Hoạt động')
    if (option === 404) setAccountStatusOption('Ngưng hoạt động')
    setUpdateAccountInfo(prev => ({ ...prev, status: option }))
    setActiveAccountStatusOptions(false)
  }

  const handleAccountUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (updateAccountInfo.name === '' ||
      updateAccountInfo.email === '' ||
      updateAccountInfo.username === '' ||
      updateAccountInfo.password === '' ||
      updateAccountInfo.role === '') {
      alert('Thông tin chưa đầy đủ!')
      return
    }
    if (updateAccountInfo.telephone.length < 10 || Number.isNaN(updateAccountInfo.telephone)) {
      alert('số điện thoại không hợp lệ')
      return
    }
    if (updateAccountInfo.password !== rePassword) {
      alert('Password không chính xác!')
      return
    }
    dispatch(updateUser({updateAccountInfo, currIndex}))
    alert('Cập nhật tài khoản thành công!')
    setTimeout(() => {
      setCurrTopic('system_account_list')
    }, 1000);
  }

  return (
    <div className="account_update-wrap">
      <h3 className='content_title'>Quản lý tài khoản</h3>
      <form className="account_update" onSubmit={(e) => handleAccountUpdateSubmit(e)}>
        <div className="account_update-content">
          <h3>Thông tin tài khoản</h3>
          <div className="account_update-info">
            <div>
              <strong>Họ và tên: </strong>
              <input type="text" placeholder='Nguyễn Văn A' value={updateAccountInfo.name}
                onChange={(e) => setUpdateAccountInfo(prev => ({ ...prev, name: e.target.value }))} />
            </div>
            <div>
              <strong>Tên đăng nhập: </strong>
              <input type="text" placeholder='anguyen' value={updateAccountInfo.username}
                onChange={(e) => setUpdateAccountInfo(prev => ({ ...prev, username: e.target.value }))} />
            </div>
            <div>
              <strong>Số điện thoại: </strong>
              <input type="text" placeholder='Nhập số điện thoại' value={updateAccountInfo.telephone}
                onChange={(e) => setUpdateAccountInfo(prev => ({ ...prev, telephone: e.target.value }))}
              />
            </div>
            <div>
              <strong>Mật khẩu: </strong>
              <input type="text" placeholder='Nhập mật khẩu' value={updateAccountInfo.password}
                onChange={(e) => setUpdateAccountInfo(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <div>
              <strong>Email: </strong>
              <input type="email" placeholder='Nhập email' value={updateAccountInfo.email}
                onChange={(e) => setUpdateAccountInfo(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <strong>Nhập lại mật khẩu: </strong>
              <input type="text" placeholder='Nhập lại mật khẩu' value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
            </div>
            <div>
              <strong>Vai trò:</strong>
              <div className="dropdown" onClick={() => setActiveAccountRoleOptions(!activeAccountRoleOption)}>
                {accountRoleOption}
                <IoMdArrowDropdown />
                <div className={!activeAccountRoleOption ? "dropdown_list hide" : "dropdown_list "}>
                  {roleList.map(role => {
                    return <span onClick={() => handleRoleOption(role.name)}>{role.name}</span>
                  })}
                </div>
              </div>
            </div>
            <div>
              <strong>Tình trạng:</strong>
              <div className="dropdown" onClick={() => setActiveAccountStatusOptions(!activeAccountStatusOption)}>
                {accountStatusOption}
                <IoMdArrowDropdown />
                <div className={!activeAccountStatusOption ? "dropdown_list hide" : "dropdown_list "}>
                  <span onClick={() => handleStatusOption(200)}>Hoạt động</span>
                  <span onClick={() => handleStatusOption(404)}>Ngưng hoạt động</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="account_update-btn">
          <button className="btn outline" type='button'
            onClick={() => setCurrTopic('system_account_list')}
          >Hủy</button>
          <button className="btn primary" type='submit'>Cập nhật</button>
        </div>
      </form>
    </div>
  )
}

export default AccountUpdate
