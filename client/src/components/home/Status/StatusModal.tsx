import React, { ChangeEvent, useState, useRef, FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store';
import { profile_types } from 'store/types/userTypes';
import { createPost, updatePost } from 'store/actions/postActions';
import { global_types } from 'store/types/globalTypes';

const StatusModal = () => {
    const dispatch = useDispatch();
    const { auth, theme, status } = useSelector((state: RootState) => state);
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [stream, setStream] = useState(false);
    const [tracks, setTracks] = useState<any>('');
    const videoRef = useRef<any>();
    const refCanvas = useRef<any>();


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const files = [...e.target.files];
        let err = '';
        let newImages: any[] = [];

        files.forEach(file => {
            if (!file) return err = 'File does not exist.';
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                return err = 'Image format is incorrect';
            }

            return newImages.push(file);
        })

        if (err) dispatch({
            type: global_types.ALERT,
            error: err
        });

        // @ts-ignore
        setImages([...images, ...newImages]);
    }

    const deleteImages = (index: number) => {
        const newArr = [...images];
        newArr.splice(index, 1);
        setImages(newArr);
    }

    const handleStream = () => {
        setStream(true);
        // @ts-ignore
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.play();
                    const track = mediaStream.getTracks();
                    setTracks(track[0]);
                })
                .catch(err => console.log(err));
        }
    };

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute('width', width);
        refCanvas.current.setAttribute('height', height);
        const ctx = refCanvas.current.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        let URL = refCanvas.current.toDataURL();
        // @ts-ignore
        setImages([...images, { camera: URL }]);
    }

    const handleStopStream = () => {
        tracks.stop();
        setStream(false);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (images.length === 0) return dispatch({
            type: global_types.ALERT,
            payload: { error: 'Please add your photo.' }
        });

        // check if modal is on edit 
        if(status.onEdit) {
            dispatch(updatePost(content, images, auth, status));
        } else {
            dispatch(createPost(content, images, auth));
        }

        // clear form & close form
        setContent('');
        setImages([]);
        if(tracks) tracks.stop();
        dispatch({ type: profile_types.STATUS, payload: false });
    };

    useEffect(() => {
        if(status.onEdit) {
            setContent(status.content)
            setImages(status.images)
        }
    }, [status.onEdit, status.content, status.images])

    return (
        <div className="status_modal">
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0">Create Post</h5>
                    <span onClick={() => dispatch({
                        type: profile_types.STATUS,
                        payload: false
                    })}>
                        &times;
                    </span>
                </div>
                <div className="status_body">
                    <textarea
                        name="content"
                        placeholder={`${auth.user.username}, what are you thinking?`}
                        onChange={e => setContent(e.target.value)}
                        value={content} />
                    <div className="show_images">
                        {
                            images.map((img: any, index) => (
                                <div
                                    id="file_img"
                                    key={index}>
                                    <img
                                        src={img.camera 
                                            ? img.camera 
                                            : img.url ? img.url : URL.createObjectURL(img)}
                                        className="img-thumbnail"
                                        alt="images"
                                        style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                                    <span onClick={() => deleteImages(index)}>&times;</span>
                                </div>
                            ))
                        }
                    </div>
                    {
                        stream && (
                            <div className="stream position-relative">
                                <video
                                    autoPlay
                                    muted
                                    ref={videoRef}
                                    width="100%"
                                    height="100%"
                                    style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                                <span onClick={handleStopStream}>&times;</span>
                                <canvas
                                    ref={refCanvas}
                                    style={{ display: 'none' }} />
                            </div>
                        )
                    }
                    <div className="input_images">
                        {
                            stream
                                ? (
                                    <i
                                        className="fas fa-camera"
                                        onClick={handleCapture} />
                                )
                                : (
                                    <>
                                        <i
                                            className="fas fa-camera"
                                            onClick={handleStream} />
                                        <div className="file_upload">
                                            <i className="fas fa-image" />
                                            <input
                                                type="file"
                                                name="file"
                                                id="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageChange} />
                                        </div>
                                    </>
                                )
                        }
                    </div>
                </div>
                <div className="status_footer">
                    <button
                        type="submit"
                        className="btn btn-secondary w-100">
                        Post
                    </button>
                </div>
            </form>
        </div>
    )
}

export default StatusModal
