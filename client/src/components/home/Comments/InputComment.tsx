import React, { ChangeEvent, FormEvent, ReactNode, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { PostData } from 'store/types/postTypes'
import { createComment } from 'store/actions/commentActions';

interface InputCommentsProps {
    children?: ReactNode
    post: PostData
}

const InputComments: React.FC<InputCommentsProps> = ({ post, children }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state: RootState) => state);
    const [content, setContent] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!content.trim()) return;

        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString()
        }

        dispatch(createComment(post, newComment, auth));
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

export default InputComments
