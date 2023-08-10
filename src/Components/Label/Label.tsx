import React, { useEffect, useState } from 'react'
import './label.css'
import { TbDeviceDesktop } from 'react-icons/tb'
import { IoChatbubblesOutline } from 'react-icons/io5'
import { GoStack } from 'react-icons/go'
function Label({ icon, percent, quantity, status, name, color }: any) {
    const [startPercent, setStartPercent] = useState<number>(0)


    useEffect(() => {
        let interval: NodeJS.Timeout
        if (startPercent < percent) {
            interval = setInterval(() => {
                setStartPercent(prev => prev + 1)
            }, 5)
        }

        return () => clearInterval(interval)

    }, [percent, startPercent])

    return (
        <div className='label'>
            <div className="label_percent" style={{ background: `conic-gradient(${color} ${startPercent * 3.6}deg, #acacac 0deg)` }}>
                <span>
                    {startPercent + '%'}
                </span>
            </div>
            <div className="label_quantity">
                {quantity}
                <div className="label_quantity-icon" style={{ color: color }}>
                    {icon}
                    {name}
                </div>
            </div>
            <div className="label_info">
                <p>
                    <small>Đang hoạt động</small>
                    <strong style={{ color: color }}>{status.on}</strong>
                </p>
                <p>
                    <small>Ngưng hoạt động</small>
                    <strong style={{ color: color }}>{status.off}</strong>
                </p>
            </div>
        </div>
    )
}

export default Label
