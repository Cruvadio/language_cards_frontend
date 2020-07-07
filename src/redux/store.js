import {combineReducers, createStore} from "redux";
import headerReducer from "./reducers/header-reducer";
import introReducer from "./reducers/intro-reducer";
import profileReducer from "./reducers/profile-reducer";
import postsReducer from "./reducers/posts_reducer";
import cardsReducer from "./reducers/cards_reducer";


let reducersBatch = combineReducers({
    header: headerReducer,
    intro: introReducer,
    profile: profileReducer,
    posts: postsReducer,
    cards: cardsReducer,
});


let store = createStore(reducersBatch);

export default store;