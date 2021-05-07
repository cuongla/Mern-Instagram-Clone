import React from 'react'
import { Link } from 'react-router-dom'
import { PostData } from 'store/types/postTypes'

interface UserPostThumbProps {
    posts: PostData[]
    result: number
}

const UserPostThumb: React.FC<UserPostThumbProps> = ({ posts, result }) => {
    return (
        <>
            {
                result === 0 && <h2 className="text-center text-danger">No Post</h2>
            }
            <div className="post_thumb">
                {
                    posts.map(post => (
                        <Link key={post._id} to={`/post/${post._id}`}>
                            <div className="post_thumb_display">
                                <img
                                    src={post.images[0].url}
                                    alt={post.images[0].url} />
                                <div className="post_thumb_menu">
                                    <i className="far fa-heart">
                                        {post.likes.length}
                                    </i>
                                    <i className="far fa-comment">
                                        {post.comments.length}
                                    </i>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default UserPostThumb
