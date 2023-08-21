import React, { useState, useEffect } from 'react'
import './roleupdate.css'

function RoleUpdate({ setCurrTopic, currRole }: any) {

    const [roleName, setRoleName] = useState<string>(currRole.name)
    const [roleDesc, setRoleDesc] = useState<string>(currRole.desc)

    const [checkBoxA_all, setCheckBoxA_all] = useState<boolean>(false)
    const [checkBoxA_1, setCheckBoxA_1] = useState<boolean>(currRole.role.A.device)
    const [checkBoxA_2, setCheckBoxA_2] = useState<boolean>(currRole.role.A.service)
    const [checkBoxA_3, setCheckBoxA_3] = useState<boolean>(currRole.role.A.customer)
    const [checkBoxB_all, setCheckBoxB_all] = useState<boolean>(false)
    const [checkBoxB_1, setCheckBoxB_1] = useState<boolean>(currRole.role.B.role)
    const [checkBoxB_2, setCheckBoxB_2] = useState<boolean>(currRole.role.B.account)
    useEffect(() => {
        if (currRole.role.A.device && currRole.role.A.service && currRole.role.A.customer) {
            setCheckBoxA_all(true)
            setCheckBoxA_1(false)
            setCheckBoxA_2(false)
            setCheckBoxA_3(false)
        }
        if (currRole.role.B.role && currRole.role.B.account) {
            setCheckBoxB_all(true)
            setCheckBoxB_1(false)
            setCheckBoxB_2(false)
        }
    }, [])



    //group A
    const handleCheckboxA_all = () => {
        if (!checkBoxA_all) {
            setCheckBoxA_1(false)
            setCheckBoxA_2(false)
            setCheckBoxA_3(false)
            setCheckBoxA_all(!checkBoxA_all)
        } else {
            setCheckBoxA_all(!checkBoxA_all)
        }

    }
    const handleCheckboxA_1 = () => {
        if (!checkBoxA_1 && checkBoxA_2 && checkBoxA_3) {
            setCheckBoxA_all(true)
            setCheckBoxA_1(false)
            setCheckBoxA_2(false)
            setCheckBoxA_3(false)
        } else {
            setCheckBoxA_all(false)
            setCheckBoxA_1(!checkBoxA_1)
        }
    }
    const handleCheckboxA_2 = () => {
        if (!checkBoxA_2 && checkBoxA_1 && checkBoxA_3) {
            setCheckBoxA_all(true)
            setCheckBoxA_1(false)
            setCheckBoxA_2(false)
            setCheckBoxA_3(false)
        } else {
            setCheckBoxA_all(false)
            setCheckBoxA_2(!checkBoxA_2)
        }
    }
    const handleCheckboxA_3 = () => {
        if (!checkBoxA_3 && checkBoxA_1 && checkBoxA_2) {
            setCheckBoxA_all(true)
            setCheckBoxA_1(false)
            setCheckBoxA_2(false)
            setCheckBoxA_3(false)
        } else {
            setCheckBoxA_all(false)
            setCheckBoxA_3(!checkBoxA_3)
        }

    }
    // group B
    const handleCheckboxB_all = () => {
        if (!checkBoxB_all) {
            setCheckBoxB_1(false)
            setCheckBoxB_2(false)
            setCheckBoxB_all(!checkBoxB_all)
        } else {
            setCheckBoxB_all(!checkBoxB_all)
        }

    }
    const handleCheckboxB_1 = () => {
        if (!checkBoxB_1 && checkBoxB_2) {
            setCheckBoxB_all(true)
            setCheckBoxB_1(false)
            setCheckBoxB_2(false)
        } else {
            setCheckBoxB_all(false)
            setCheckBoxB_1(!checkBoxB_1)
        }
    }
    const handleCheckboxB_2 = () => {
        if (!checkBoxB_2 && checkBoxB_1) {
            setCheckBoxB_all(true)
            setCheckBoxB_1(false)
            setCheckBoxB_2(false)
        } else {
            setCheckBoxB_all(false)
            setCheckBoxB_2(!checkBoxB_2)
        }
    }

    //handle submit
    const handleRoleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const updateRole = {
            name: roleName,
            desc: roleDesc,
            role: {
                A: {
                    device: checkBoxA_all || checkBoxA_1,
                    service: checkBoxA_all || checkBoxA_2,
                    customer: checkBoxA_all || checkBoxA_3,
                },
                B: {
                    role: checkBoxB_all || checkBoxB_1,
                    account: checkBoxB_all || checkBoxB_2,
                }
            }
        }
        if (!updateRole.name || !updateRole.desc) {
            alert('Vui lòng nhập đầy đủ thông tin')
            return
        }
        if (!checkBoxA_all && !checkBoxA_1 && !checkBoxA_2 && !checkBoxA_3
            && !checkBoxB_all && !checkBoxB_1 && !checkBoxB_2) {
            alert('Vui lòng chọn vai trò')
            return
        }
        console.log(updateRole)
        alert('Cập nhật thành công')
        setCurrTopic('system_role_list')
    }


    return (
        <div className="role_update-wrap">
            <h3 className='content_title'>Quản lý thiết bị</h3>
            <form className="role_update" onSubmit={(e) => handleRoleUpdateSubmit(e)}>
                <div className="role_update-content">
                    <h3>Thông tin vai trò</h3>
                    <div className="role_update-content-container">
                        {/* left */}
                        <div className="role_update-content-left">
                            <span>Tên vai trò</span>
                            <input type="text" onChange={(e) => setRoleName(e.target.value)} value={roleName} />
                            <span>Mô tả</span>
                            <textarea rows={6} placeholder='Chịu trách nhiệm...' value={roleDesc}
                                onChange={(e) => setRoleDesc(e.target.value)}
                            ></textarea>
                        </div>
                        {/* right */}
                        <div className="role_update-content-right">
                            <span>Phân quyền chức năng</span>
                            <div className="role_update-group">
                                <strong>Nhóm chức năng A</strong>
                                <p>
                                    <input type="checkbox" onClick={handleCheckboxA_all} checked={checkBoxA_all} />
                                    Tất cả
                                </p>
                                <p>
                                    <input type="checkbox" onClick={handleCheckboxA_1} checked={checkBoxA_1} />
                                    Quản lý thiết bị
                                </p>
                                <p>
                                    <input type="checkbox" onClick={handleCheckboxA_2} checked={checkBoxA_2} />
                                    Quản lý dịch vụ
                                </p>
                                <p>
                                    <input type="checkbox" onClick={handleCheckboxA_3} checked={checkBoxA_3} />
                                    Cấp số khách hàng
                                </p>

                                <strong>Nhóm chức năng B</strong>
                                <p>
                                    <input type="checkbox" onClick={handleCheckboxB_all} checked={checkBoxB_all} />
                                    Tất cả
                                </p>
                                <p>
                                    <input type="checkbox" onClick={handleCheckboxB_1} checked={checkBoxB_1} />
                                    Quản lý vai trò
                                </p>
                                <p>
                                    <input type="checkbox" onClick={handleCheckboxB_2} checked={checkBoxB_2} />
                                    Quản lý tài khoản
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="role_update-btn">
                    <button className="btn outline" type='button'
                        onClick={() => setCurrTopic('system_role_list')}
                    >Hủy</button>
                    <button className="btn primary" type='submit'>Cập nhật</button>
                </div>
            </form>
        </div>
    )
}

export default RoleUpdate
