import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import headerReducer from "./reducers/header-reducer";
import introReducer from "./reducers/intro-reducer";
import profileReducer from "./reducers/profile-reducer";
import postsReducer from "./reducers/posts_reducer";
import cardsReducer from "./reducers/cards_reducer";
import thunkMiddleware from "redux-thunk"
import authReducer from "./reducers/auth_reducer";
import {reducer as formReducer} from "redux-form";
import appReducer from "./reducers/app_reducer";
import {commonReducer} from "./reducers/common_reducer";
import usersReducer from "./reducers/users_reducer";
import dialogsReducer from './reducers/dialogs_reducer'


let reducersBatch = combineReducers({
    header: headerReducer,
    intro: introReducer,
    profile: profileReducer,
    posts: postsReducer,
    cards: cardsReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
    common: commonReducer,
    users: usersReducer,
    dialogs: dialogsReducer
});

export type RootState = ReturnType<typeof reducersBatch>


type InferPropertiesType<T> = T extends {[key: string]: infer U} ? U : never
export type ActionType<T extends {[key: string]:(...args : any[]) => any}> = ReturnType<InferPropertiesType<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducersBatch, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

export default store;