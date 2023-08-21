import React, { ReactElement, useEffect } from 'react'
import './rolelist.css'
import { Search } from '../../../../Components'
import { Table } from 'antd'
import { AiOutlinePlus } from 'react-icons/ai'
import { systemRoleData } from '../../../../testdata'
import { useAppDispatch, useAppSelector } from '../../../../Redux/store'
import { fetchUsers } from '../../../../Redux/userslice'

function RoleList({ setCurrTopic, setCurrRole }: any) {
    const userData = useAppSelector(state => state.users.usersList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    //handle table
    const columns = [
        {
            title: 'Tên vai trò',
            key: 'name',
            dataIndex: 'name',
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
                            setCurrRole(record)
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
                            <Search />
                        </div>
                    </div>
                    {/* Table */}
                    <div className="role_list-table">
                        <Table dataSource={systemRoleData} columns={columns} pagination={{ pageSize: 10 }} />
                    </div>
                </div>
                {/* Sub */}
                <div className="role_list-sub">
                    <div className="main_btn" onClick={() => setCurrTopic('system_role_add')}>
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