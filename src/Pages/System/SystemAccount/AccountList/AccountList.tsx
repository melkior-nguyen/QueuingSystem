import React, { ReactElement, useState, useEffect } from 'react'
import './accountlist.css'
import { IoMdArrowDropdown } from 'react-icons/io'
import { systemRoleData } from '../../../../testdata'
import { Search } from '../../../../Components'
import { Table } from 'antd'
import { AiOutlinePlus } from 'react-icons/ai'
import { GoDotFill } from 'react-icons/go'
import { useAppDispatch, useAppSelector } from '../../../../Redux/store'
import { fetchUsers } from '../../../../Redux/slice/userslice'
import { fetchRoles } from '../../../../Redux/slice/roleSlice'

function AccountList({ setCurrTopic, setCurrAccount, setCurrIndex }: any) {
  const userData = useAppSelector(state => state.users.usersList)
  const roleList = useAppSelector(state=> state.role.roleList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchRoles())
  }, [dispatch])


  const [activeRoleOptions, setActiveRoleOptions] = useState<boolean>(false)
  const [roleOption, setRoleOption] = useState<string>('Tất cả')

  const handleRoleOptions = (option: string) => {
    setRoleOption(option)
    setActiveRoleOptions(false)
  }

  //handle table
  const columns = [
    {
      title: 'Tên đăng nhập',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: 'Họ và tên',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Số điện thoại',
      key: 'telephone',
      dataIndex: 'telephone'
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email'
    },
    {
      title: 'Vai trò',
      key: 'role',
      dataIndex: 'role',
      filteredValue: [roleOption],
      onFilter: (text: any, record: any) => {
        if (roleOption === 'Tất cả') return record.role
        return roleOption === record.role
      }
    },
    {
      title: 'Trạng thái hoạt động',
      key: 'status',
      dataIndex: 'status',
      render: (text: any, record: any, index: number): ReactElement => {
        if (text === 200) return <span className="align_center"><GoDotFill style={{ color: 'green' }} />Hoạt động</span>
        if (text === 404) return <span className="align_center"><GoDotFill style={{ color: 'red' }} />Ngưng hoạt động</span>
        return <span>---</span>
      }
    },
    {
      title: '',
      key: 'update',
      render: (text: any, record: any, index: number): ReactElement => {
        return (
          <span
            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
            onClick={() => {
              setCurrAccount(record)
              setCurrIndex(index)
              setCurrTopic('system_account_update')
            }
            }
          >Cập nhật</span>
        )
      }
    }
  ]
  return (
    <div className="account_list-wrap">
      <h3 className='content_title'>Quản lý cấp số</h3>
      <div className="account_list">
        {/* Main */}
        <div className="account_list-main">
          {/* Navbar */}
          <div className="account_list-nav">
            <div className="account_list-role">
              <span>Tên vai trò</span>
              <div className="dropdown account_list-dropdown" onClick={() => setActiveRoleOptions(!activeRoleOptions)}>
                {roleOption}
                <IoMdArrowDropdown />
                <div className={!activeRoleOptions ? "dropdown_list hide" : "dropdown_list "}>
                  <span onClick={() => handleRoleOptions('Tất cả')}>Tất cả</span>
                  {roleList.map(data => {
                    return (
                      <span onClick={() => handleRoleOptions(data.name)}>{data.name}</span>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="account_list-search">
              <span>Từ khóa </span>
              <Search />
            </div>
          </div>
          {/* Table */}
          <div className="account_list-table">
            <Table dataSource={userData} columns={columns} pagination={{ pageSize: 10 }} />
          </div>
        </div>
        {/* Sub */}
        <div className="account_list-sub">
          <div className="main_btn" onClick={() => setCurrTopic('system_account_add')}>
            <div className="main_btn-icon">
              <AiOutlinePlus />
            </div>
            Thêm tài khoản
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountList
