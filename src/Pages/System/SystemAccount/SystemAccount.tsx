import React, { useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { userType } from '../../../type'
import AccountList from './AccountList/AccountList'
import AccountAdd from './AccountAdd/AccountAdd'
import AccountUpdate from './AccountUpdate/AccountUpdate'

function SystemAccount() {
  const [currTopic, setCurrTopic] = useState<string>('system_account_list')
  const [currAccount, setCurrAccount] = useState<userType | {}>({})
  const [currIndex, setCurrIndex] = useState<number>(0)

  return (
    <div className='main_content'>
      <h3 className='top_content'>
        {/* change topic change top content */}
        <span>Cài đặt hệ thống </span>
        <AiOutlineRight />
        <span className={currTopic === 'system_account_list' ? 'current' : ''}
          onClick={() => setCurrTopic('system_account_list')}
          style={{ cursor: 'pointer' }}
        >Quản lý tài khoản</span>
        {currTopic !== 'system_account_list' && <AiOutlineRight />}
        {currTopic === 'system_account_add' && <span className='current'> Thêm tài khoản</span>}
        {currTopic === 'system_account_update' && <span className='current'> Cập nhật tài khoản</span>}
      </h3>
      {/* component */}
      {currTopic === 'system_account_list' && <AccountList setCurrTopic={setCurrTopic} setCurrAccount={setCurrAccount} setCurrIndex={setCurrIndex} />}
      {currTopic === 'system_account_add' && <AccountAdd setCurrTopic={setCurrTopic} />}
      {currTopic === 'system_account_update' && <AccountUpdate setCurrTopic={setCurrTopic} currAccount={currAccount} currIndex={currIndex} />}
    </div>
  )
}

export default SystemAccount
