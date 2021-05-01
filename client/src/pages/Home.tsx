import React from 'react';
import Status from 'components/home/Status';
import Posts from 'components/home/Posts';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import LoadIcon from '../images/loading.gif';

const Home = () => {
    const { homePosts } = useSelector((state: RootState) => state);

    return (
        <div className="home roq mx-0">
            <div className="col-md-8">
                <Status />
                { homePosts.loading 
                    ? (
                        <img 
                            src={LoadIcon} 
                            alt="loading" 
                            className="d-block mx-auto" />
                    )
                    : homePosts.result === 0 
                        ? <h2 className="text-center">No Post</h2>
                        : <Posts />
                }
            </div>
            <div className="col-md-4"></div>
        </div>
    )
}

export default Home
