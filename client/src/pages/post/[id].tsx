import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RootState } from 'store';
import { IParams } from 'typings/params';
import { getPostDetail } from 'store/actions/postActions';
import { PostData } from 'store/types/postTypes';
import LoadIcon from 'images/loading.gif'
import PostCard from 'components/home/PostCard';

const PostDetail = () => {
    const { id } = useParams<IParams>();
    const { auth, detailPost } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const [post, setPost] = useState<PostData[]>([]);

    useEffect(() => {
        dispatch(getPostDetail(detailPost, id, auth));

        if (detailPost.length > 0) {
            const newArr = detailPost.filter(post => post._id === id);
            setPost(newArr);
        }
    }, [dispatch, detailPost, id, auth])

    return (
        <div className="posts">
            {
                post.length === 0 && <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
            }
            {
                post.map(item => (
                    <PostCard key={item._id} post={item} />
                ))
            }
        </div>
    )
}

export default PostDetail;
