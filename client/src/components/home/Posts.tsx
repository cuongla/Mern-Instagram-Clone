import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { PostData } from 'store/types/postTypes';
import CardHeader from './post_card/CardHeader';
import CardBody from './post_card/CardBody';
import CardFooter from './post_card/CardFooter';


const Posts = () => {
    const { homePosts } = useSelector((state: RootState) => state);

    return (
        <div className="posts">
            {
                homePosts.posts.map((post: PostData) => (
                    <div
                        key={post._id} 
                        className="card my-3">
                            <CardHeader post={post} />
                            <CardBody post={post} />
                            <CardFooter post={post} />
                    </div>
                ))
            }
        </div>
    )
}

export default Posts
