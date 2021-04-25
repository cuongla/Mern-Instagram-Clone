import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';


// reducers
import authReducer from './reducers/authReducer';
import profileReducer from './reducers/profileReducer';
import alertReducer from './reducers/alertReducer';
import themeReducer from './reducers/themeReducers';

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    theme: themeReducer,
    profile: profileReducer
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof rootReducer>
export default store;