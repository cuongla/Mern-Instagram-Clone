import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { ALERT } from 'store/types/alertTypes';
import { getDataAPI } from 'utils/fetchData';
import UserCard from 'components/reusable/UserCard';
import { SearchResult } from 'typings/search';
import LoadIcon from 'images/loading.gif';

const Search = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { auth } = useSelector((state: RootState) => state);


    useEffect(() => {
        if (search) {
            setIsLoading(true);
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
            setIsLoading(false);
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
            {/* Loading */}
            {
                isLoading && <img
                    className="search-loading"
                    src={LoadIcon}
                    alt="Loading Gif" />
            }
            <div
                className="close_search"
                onClick={handleClose}
                style={{
                    opacity: users.length === 0 ? 0 : 1
                }}>
                {!isLoading
                    ? <span
                        style={{ fontSize: '14px' }}
                        className="material-icons ">cancel</span>
                    : ''
                }
            </div>
            {/* Search Result */}
            {
                search && (
                    <div className="users">
                        { users.length === 0 && (
                            <p
                                style={{ color: 'gray' }}
                                className="mt-3 text-center">No Result Found.
                            </p>
                        )}
                        {
                            users
                                .filter((a: SearchResult) => a._id !== auth.user._id)
                                .map((user: SearchResult) => (
                                    <UserCard
                                        key={user._id}
                                        user={user}
                                        border="border"
                                        handleClose={handleClose} />
                                ))
                        }
                    </div>
                )
            }
        </form>
    )
}

export default Search
