import React from 'react'

interface LoadMoreBtnProps {
    result: number
    page: number
    loading: boolean
    handleLoadMore: () => void
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ result, page, loading, handleLoadMore }) => {
    return (
        <>
            {
                result < 3 * (page - 1) ? '' : !loading && <button 
                    onClick={handleLoadMore}
                    className="btn btn-dark mx-auto d-block">
                    Load More
                </button>
            }
        </>
    )
}

export default LoadMoreBtn
