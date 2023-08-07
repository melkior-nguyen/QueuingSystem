import React from 'react'
import './tag.css'
// icon
import { AiOutlineArrowUp } from 'react-icons/ai'
import { AiOutlineArrowDown } from 'react-icons/ai'



function Tag({ name, icon, quantity, percent, percentType, color, backgroundColor }: any) {
    return (
        <div className='tag'>
            <div className="tag_name">
                <div className="tag_name-icon" style={{ color: color, backgroundColor: backgroundColor }}>
                    {icon}
                </div>
                <span>{name}</span>
            </div>

            <div className="tag_info">
                <strong>{quantity}</strong>
                {percentType === 'up' ?
                    <div className="tag_info-percent up">
                        <AiOutlineArrowUp />
                        {percent}
                    </div> :
                    <div className="tag_info-percent down">
                        <AiOutlineArrowDown />
                        {percent}
                    </div>
                }
            </div>
        </div>
    )
}

export default Tag
