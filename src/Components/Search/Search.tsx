import React from 'react'
import './search.css'
import { AiOutlineSearch } from 'react-icons/ai'

function Search() {
    return (
        <div className="search">
            <input type="text" placeholder='Nhập từ khóa'/>
            <AiOutlineSearch />
        </div>
    )
}

export default Search
