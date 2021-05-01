import React from 'react';
import { Link } from 'react-router-dom';
import { PostData } from 'store/types/postTypes';
import Send from 'images/send.svg';

export interface PostCardProps {
    post: PostData
}

const CardFooter: React.FC<PostCardProps> = ({ post }) => {
    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <i className="far fa-heart" />
                    <Link to={`/post/${post._id}`}>
                        <i className="far fa-comment" />
                    </Link>
                    <img src={Send} alt="Send" />
                </div>
                <i className="far fa-bookmark" />
            </div>
            <div className="d-flex justify-content-between mx-0">
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {(post as any).likes.length}
                </h6>
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {(post as any).comments.length} comments
                </h6>
            </div>
        </div>
    )
}

export default CardFooter;
