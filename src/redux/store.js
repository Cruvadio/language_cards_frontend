import {applyMiddleware, combineReducers, createStore} from "redux";
import headerReducer from "./reducers/header-reducer";
import introReducer from "./reducers/intro-reducer";
import profileReducer from "./reducers/profile-reducer";
import postsReducer from "./reducers/posts_reducer";
import cardsReducer from "./reducers/cards_reducer";
import thunkMiddleware from "redux-thunk"
import authReducer from "./reducers/auth_reducer";


let reducersBatch = combineReducers({
    header: headerReducer,
    intro: introReducer,
    profile: profileReducer,
    posts: postsReducer,
    cards: cardsReducer,
    auth: authReducer,
});


let store = createStore(reducersBatch, applyMiddleware(thunkMiddleware));

export default store;