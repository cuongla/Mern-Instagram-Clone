import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';


// reducers
import authReducer from './reducers/authReducer';
import profileReducer from './reducers/profileReducer';
import alertReducer from './reducers/alertReducer';
import themeReducer from './reducers/themeReducers';
import statusReducer from './reducers/statusReducer';
import postReducer from './reducers/postReducer';
import modalReducer from './reducers/modalReducer';
import detailPostReducer from './reducers/detailPostReducer';
import discoverReducer from './reducers/discoverReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    theme: themeReducer,
    profile: profileReducer,
    status: statusReducer,
    homePosts: postReducer,
    modal: modalReducer,
    detailPost: detailPostReducer,
    discover: discoverReducer
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof rootReducer>
export default store;