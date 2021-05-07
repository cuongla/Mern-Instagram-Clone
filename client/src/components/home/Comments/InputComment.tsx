import React, { ChangeEvent, FormEvent, ReactNode, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { CommentData, PostData } from 'store/types/postTypes'
import { createComment } from 'store/actions/commentActions';

interface InputCommentsProps {
    children?: ReactNode
    post: PostData
    targetComment?: CommentData
    onReply?: boolean
    setOnReply?: any
}

const InputComment: React.FC<InputCommentsProps> = ({ post, children, targetComment, onReply, setOnReply }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state: RootState) => state);
    const [content, setContent] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!content.trim()) {
            if(setOnReply) return setOnReply(false);
            return; 
        }

        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
            reply: onReply && targetComment?._id,
            tag: onReply && targetComment?.user
        }
        console.log(onReply);

        dispatch(createComment(post, newComment, auth));
        if(setOnReply) return setOnReply(false);
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="card-footer comment_input">
            {children}
            <input
                type="text"
                placeholder="Add your comment..."
                value={content}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)} />
            <button type="submit" className="postBtn">
                Post
            </button>
        </form>
    )
}

export default InputComment;
