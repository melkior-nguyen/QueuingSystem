import React, { ReactElement, useEffect, useState } from 'react'
import './rolelist.css'
import { Search } from '../../../../Components'
import { Table } from 'antd'
import { AiOutlinePlus } from 'react-icons/ai'
import { systemRoleData } from '../../../../testdata'
import { useAppDispatch, useAppSelector } from '../../../../Redux/store'
import { fetchCurrUser, fetchUsers } from '../../../../Redux/slice/userSlice'
import { fetchRoles } from '../../../../Redux/slice/roleSlice'

function RoleList({ setCurrTopic, setCurrRole, setCurrIndex }: any) {
    const roleList = useAppSelector(state => state.role.roleList)
    const userData = useAppSelector(state => state.users.usersList)
    const currUser = useAppSelector(state => state.users.currUser)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(fetchRoles())
        dispatch(fetchCurrUser())
    }, [dispatch])


    const [searchInput, setSearchInput] = useState<string>('')
    //handle table
    const columns = [
        {
            title: 'Tên vai trò',
            key: 'name',
            dataIndex: 'name',
            filteredValue: [searchInput],
            onFilter: (value: any, record: any) => {
                if (value !== '') {
                    return record.name.toLowerCase().indexOf(value.toLowerCase()) !== -1   
                }
                else return record.name
            }
        },
        {
            title: 'Số người dùng',
            key: 'quantity',
            render: (text: any, record: any) => {
                let count = 0
                userData.forEach(user => {
                    if (user.role === record.name) {
                        count += 1
                    }
                })
                return count
            }
        },
        {
            title: 'Mô tả',
            key: 'desc',
            dataIndex: 'desc'
        },
        {
            title: '',
            key: 'update',
            render: (text: any, record: any, index: number): ReactElement => {
                return (
                    <span
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                        onClick={() => {
                            const userRole = roleList.find(role => role.name === currUser.role)
                            if (!userRole?.role.B.role) {
                                alert('Không có quyền thực hiện chức năng này!')
                                return
                            }
                            setCurrRole(record)
                            setCurrIndex(index)
                            setCurrTopic('system_role_update')
                        }
                        }
                    >Cập nhật</span>
                )
            }
        },
    ]

    return (
        <div className="role_list-wrap">
            <h3 className='content_title'>Danh sách vai trò</h3>
            <div className="role_list">
                {/* Main */}
                <div className="role_list-main">
                    {/* Navbar */}
                    <div className="role_list-nav">
                        <div className="role_list-search">
                            <span>Từ khóa </span>
                            <Search setSearchInput={setSearchInput}/>
                        </div>
                    </div>
                    {/* Table */}
                    <div className="role_list-table">
                        <Table dataSource={roleList} columns={columns} pagination={{ pageSize: 10 }} />
                    </div>
                </div>
                {/* Sub */}
                <div className="role_list-sub">
                    <div className="main_btn" onClick={() => {
                        const userRole = roleList.find(role => role.name === currUser.role)
                        if (!userRole?.role.B.role) {
                            alert('Không có quyền thực hiện chức năng này!')
                            return
                        }
                        setCurrTopic('system_role_add')
                    }}>
                        <div className="main_btn-icon">
                            <AiOutlinePlus />
                        </div>
                        Thêm vai trò
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoleList
