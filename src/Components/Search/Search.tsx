import React, { useState } from 'react'
import './search.css'
import { AiOutlineSearch } from 'react-icons/ai'

function Search({setSearchInput}: any) {
    return (
        <div className="search">
            <input type="text" placeholder='Nhập từ khóa' onChange={(e) => setSearchInput(e.target.value)} />
            <AiOutlineSearch />
        </div>
    )
}

export default Search
