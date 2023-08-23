import React, { useState, useEffect } from 'react'
import './accountadd.css'
import { IoMdArrowDropdown } from 'react-icons/io'
import { userType } from '../../../../type'
import { systemRoleData } from '../../../../testdata'
import { useAppDispatch, useAppSelector } from '../../../../Redux/store'
import { addUser, fetchUsers } from '../../../../Redux/slice/userslice'
import { fetchRoles } from '../../../../Redux/slice/roleSlice'

function AccountAdd({ setCurrTopic }: any) {
  const roleList = useAppSelector(state=> state.role.roleList)

  const [activeAccountRoleOption, setActiveAccountRoleOptions] = useState<boolean>(false)
  const [accountRoleOption, setAccountRoleOption] = useState<string>('Chọn vai trò')
  const [activeAccountStatusOption, setActiveAccountStatusOptions] = useState<boolean>(false)
  const [accountStatusOption, setAccountStatusOption] = useState<string>('Hoạt động')

  const userList = useAppSelector(state => state.users.usersList)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchRoles())
  }, [dispatch])

  const [newAccountInfo, setNewAccountInfo] = useState<userType>(
    {
      id: userList.length,
      name: '',
      email: '',
      username: '',
      password: '',
      role: '',
      telephone: '',
      avatar: 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
      status: 200
    }
  )

  const [rePassword, setRePassword] = useState<string>('')

  const handleRoleOption = (option: string) => {
    setAccountRoleOption(option)
    setActiveAccountRoleOptions(false)
    setNewAccountInfo(prev => ({ ...prev, role: option }))
  }

  const handleStatusOption = (option: number) => {
    if (option === 200) setAccountStatusOption('Hoạt động')
    if (option === 404) setAccountStatusOption('Ngưng hoạt động')
    setNewAccountInfo(prev => ({ ...prev, status: option }))
    setActiveAccountStatusOptions(false)
  }

  const handleAccountAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newAccountInfo.name === '' ||
      newAccountInfo.email === '' ||
      newAccountInfo.username === '' ||
      newAccountInfo.password === '' ||
      newAccountInfo.role === '') {
      alert('Thông tin chưa đầy đủ!')
      return
    }
    if (newAccountInfo.telephone.length < 10 || Number.isNaN(newAccountInfo.telephone)) {
      alert('số điện thoại không hợp lệ')
      return
    }
    if (newAccountInfo.password !== rePassword) {
      alert('Password không chính xác!')
      return
    }
    dispatch(addUser(newAccountInfo))
    alert('Thêm tài khoản thành công')
    setTimeout(() => {
      setCurrTopic('system_account_list')
    }, 1000);
  }

  return (
    <div className="account_add-wrap">
      <h3 className='content_title'>Quản lý tài khoản</h3>
      <form className="account_add" onSubmit={(e) => handleAccountAddSubmit(e)}>
        <div className="account_add-content">
          <h3>Thông tin tài khoản</h3>
          <div className="account_add-info">
            <div>
              <strong>Họ và tên: </strong>
              <input type="text" placeholder='Nguyễn Văn A'
                onChange={(e) => setNewAccountInfo(prev => ({ ...prev, name: e.target.value }))} />
            </div>
            <div>
              <strong>Tên đăng nhập: </strong>
              <input type="text" placeholder='anguyen'
                onChange={(e) => setNewAccountInfo(prev => ({ ...prev, username: e.target.value }))} />
            </div>
            <div>
              <strong>Số điện thoại: </strong>
              <input type="text" placeholder='Nhập số điện thoại'
                onChange={(e) => setNewAccountInfo(prev => ({ ...prev, telephone: e.target.value }))}
              />
            </div>
            <div>
              <strong>Mật khẩu: </strong>
              <input type="text" placeholder='Nhập mật khẩu'
                onChange={(e) => setNewAccountInfo(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <div>
              <strong>Email: </strong>
              <input type="email" placeholder='Nhập email'
                onChange={(e) => setNewAccountInfo(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <strong>Nhập lại mật khẩu: </strong>
              <input type="password" placeholder='Nhập lại mật khẩu'
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
        <div className="account_add-btn">
          <button className="btn outline" type='button'
            onClick={() => setCurrTopic('system_account_list')}
          >Hủy</button>
          <button className="btn primary" type='submit'>Thêm thiết bị</button>
        </div>
      </form>
    </div>
  )
}

export default AccountAdd
