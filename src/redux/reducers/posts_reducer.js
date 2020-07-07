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
            avatar: "https://cache3.youla.io/files/images/780_780/5b/0f/5b0fc435b5fc2d3b38497323.jpg",
            likesCount: 4
        },
        {
            id: 2,
            text: "I'm doing new website!",
            avatar: "https://cache3.youla.io/files/images/780_780/5b/0f/5b0fc435b5fc2d3b38497323.jpg",
            likesCount: 2
        },
        {
            id: 3,
            text: "What are you doing?",
            avatar: "https://cache3.youla.io/files/images/780_780/5b/0f/5b0fc435b5fc2d3b38497323.jpg",
            likesCount: 2
        },
    ],
    newPostText: '',
}


const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {

            let newPost = {
                id: state.posts.length + 1,
                text: state.newPostText,
                avatar: "https://cache3.youla.io/files/images/780_780/5b/0f/5b0fc435b5fc2d3b38497323.jpg",
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

export const addPostActionCreator = () => ({type: ADD_POST})
export const updatePostTextActionCreator = (newPostText) => ({type: UPDATE_NEW_POST_TEXT, newPostText: newPostText})

export default postsReducer;