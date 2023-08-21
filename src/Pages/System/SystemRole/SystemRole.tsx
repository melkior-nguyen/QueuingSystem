import React, { useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { systemRoleDataType } from '../../../type'
import RoleList from './RoleList/RoleList'
import RoleAdd from './RoleAdd/RoleAdd'
import RoleUpdate from './RoleUpdate/RoleUpdate'

function SystemRole() {
  const [currTopic, setCurrTopic] = useState<string>('system_role_list')
  const [currRole, setCurrRole] = useState<systemRoleDataType | {}>({})

  return (
    <div className='main_content'>
      <h3 className='top_content'>
        {/* change topic change top content */}
        <span>Cài đặt hệ thống </span>
        <AiOutlineRight />
        <span className={currTopic === 'system_role_list' ? 'current' : ''}
          onClick={() => setCurrTopic('system_role_list')}
          style={{ cursor: 'pointer' }}
        >Quản lý vai trò</span>
        {currTopic !== 'system_role_list' && <AiOutlineRight />}
        {currTopic === 'system_role_add' && <span className='current'> Thêm vai trò</span>}
        {currTopic === 'system_role_update' && <span className='current'> Cập nhật vai trò</span>}
      </h3>
      {/* component */}
      {currTopic === 'system_role_list' && <RoleList setCurrTopic={setCurrTopic} setCurrRole={setCurrRole} />}
      {currTopic === 'system_role_add' && <RoleAdd setCurrTopic={setCurrTopic} />}
      {currTopic === 'system_role_update' && <RoleUpdate setCurrTopic={setCurrTopic} currRole={currRole} />}
    </div>
  )
}

export default SystemRole
