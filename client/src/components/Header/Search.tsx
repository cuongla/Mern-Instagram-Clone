import React, { useState } from 'react'

const Search = () => {
    const [search, setSearch] = useState('');

    return (
        <form className="search_form">
            <input 
                type="text" 
                name="search" 
                value={search}
                id="search"
                onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} />
            <div 
                className="search_icon"
                style={{
                    opacity: search ? 0 : 0.3
                }}>
                <span className="material-icons">search</span>
                <span>Search</span>
            </div>
            <div className="close_search" onClick={() => setSearch('')}>&times;</div>
        </form>
    )
}

export default Search