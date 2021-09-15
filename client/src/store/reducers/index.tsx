import { combineReducers } from 'redux';
// profile
import auth from './profile/authReducer';
import profile from './profile/profileReducer';
import status from './profile/statusReducer';
import suggestionFriends from './profile/suggestionsReducer';
import online from './profile/onlineReducer';
// posts
import posts from './post/postReducer';
import detailPost from './post/detailPostReducer';
import discoverPosts from './post/discoverReducer';
// message
import message from './message/messageReducer';
import call from './message/callReducer'
import peer from './message/peerReducer'
// alert/modal
import alert from './alertReducer'
import modal from './modalReducer'
import notification from './notificationReducer'
// socket
import socket from './socketReducer'



export default combineReducers({
    auth,
    profile,
    status,
    suggestionFriends,
    posts,
    detailPost,
    discoverPosts,
    message,
    online,
    call,
    peer,
    alert,
    modal,
    socket,
    notification
});