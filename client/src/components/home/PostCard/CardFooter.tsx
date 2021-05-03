import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostData } from 'store/types/postTypes';
import Send from 'images/send.svg';
import LikeButton from './LikeButton';
import { useDispatch, useSelector } from 'react-redux'; 
import { RootState } from 'store';
import { likePost, unlikePost } from 'store/actions/postActions';

export interface PostCardProps {
    post: PostData
}

const CardFooter: React.FC<PostCardProps> = ({ post }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state: RootState) => state);
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);

    useEffect(() => {
        if(post.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true);
        }
    }, [post.likes, auth.user._id]);

    const handleLike = async () => {
        if(loadLike) return;
        setIsLike(true);

        // like post
        setLoadLike(true);
        await dispatch(likePost(post, auth));
        setLoadLike(false);
    }

    const handleUnlike = async () => {
        if(loadLike) return;
        setIsLike(false);

        // unlike post
        setLoadLike(true);
        await dispatch(unlikePost(post, auth));
        setLoadLike(false);
    }

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <LikeButton 
                        isLike={isLike}
                        handleLike={handleLike}
                        handleUnlike={handleUnlike} />
                    <Link to={`/post/${post._id}`}>
                        <i className="far fa-comment" />
                    </Link>
                    <img src={Send} alt="Send" />
                </div>
                <i className="far fa-bookmark" />
            </div>
            <div className="d-flex justify-content-between mx-0">
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {(post as any).likes.length} likes
                </h6>
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {(post as any).comments.length} comments
                </h6>
            </div>
        </div>
    )
}

export default CardFooter;
