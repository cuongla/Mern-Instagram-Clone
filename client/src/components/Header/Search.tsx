import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { ALERT } from 'store/types/alertTypes';
import { getDataAPI } from 'utils/fetchData';
import { Link } from 'react-router-dom';
import UserCard from 'components/reusable/UserCard';
import { SearchResult } from 'typings/search';

const Search = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<SearchResult[]>([]);
    const dispatch = useDispatch();
    const { auth } = useSelector((state: RootState) => state);

    useEffect(() => {
        if (search) {
            getDataAPI(`search?username=${search}`, auth.token)
                .then(res => {
                    setUsers(res.data);
                })
                .catch(err => dispatch({
                    type: ALERT,
                    payload: {
                        error: ''
                    }
                }));
        }
    }, [search, auth.token, dispatch]);

    const handleClose = () => {
        setSearch('');
        setUsers([]);
    }

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
            <div
                className="close_search"
                onClick={handleClose}
                style={{
                    opacity: users.length === 0 ? 0 : 1
                }}>
                &times;
            </div>
            {/* Search Result */}
            {
                search && (
                    <div className="users">
                        {
                            users.map((user: SearchResult) => (
                                <Link
                                    key={user._id}
                                    to={`/profile/${user._id}`}
                                    onClick={handleClose}>
                                    <UserCard user={user} border="border" />
                                </Link>
                            ))
                        }
                    </div>
                )
            }
        </form>
    )
}

export default Search
