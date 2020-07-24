import { PostType } from "../../types/global";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';



let initialState = {
    headerName: "Posts",
    placeholder: "Type something!",
    submit: "Add",

    posts: [
        {
            id: 1,
            text: "Hello, World!",
            likesCount: 4
        },
        {
            id: 2,
            text: "I'm doing new website!",
            likesCount: 2
        },
        {
            id: 3,
            text: "What are you doing?",
            likesCount: 2
        },
    ] as Array<PostType>,
    newPostText: '',
}

type InitialStateType = typeof initialState

const postsReducer = (state = initialState, action : any) : InitialStateType => {
    switch (action.type) {
        case ADD_POST: {

            let newPost = {
                id: state.posts.length + 1,
                text: state.newPostText,
                likesCount: 0,
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newPostText
            };
        }
        default:
            return state;

    }
}


export type AddPostActionType = {
    type: typeof ADD_POST,
}

export const addPostActionCreator = () : AddPostActionType => ({type: ADD_POST})
export type UpdatePostTextActionType = {
    type: typeof UPDATE_NEW_POST_TEXT,
    newPostText: string,
}

export const updatePostTextActionCreator = (newPostText : string) : UpdatePostTextActionType => ({type: UPDATE_NEW_POST_TEXT, newPostText: newPostText})

export default postsReducer;