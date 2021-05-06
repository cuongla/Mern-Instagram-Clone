import React, { ChangeEvent, FormEvent, ReactNode, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { PostData } from 'store/types/postTypes'
import { createComment } from 'store/actions/commentActions';

interface InputCommentsProps {
    children?: ReactNode
    post: PostData
    onReply?: boolean
    setOnReply?: any
    commentId?: string
}

const InputComment: React.FC<InputCommentsProps> = ({ post, children, onReply, setOnReply, commentId }) => {
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
            reply: onReply && commentId,
            tag: onReply && auth.user
        }

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
