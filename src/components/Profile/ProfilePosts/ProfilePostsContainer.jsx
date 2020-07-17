import {connect} from "react-redux";
import ProfilePosts from "./ProfilePosts";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/reducers/posts_reducer";

let mapStateToProps = (state) => ({
    placeholder: state.posts.placeholder,
    submit: state.posts.submit,
    headerName: state.posts.headerName,
    posts: state.posts.posts,
    newPostText: state.posts.newPostText
})


let mapDispatchToProps = (dispatch) => ({
    addPost: () => { dispatch(addPostActionCreator());},
    updatePostText: (text) => { dispatch(updatePostTextActionCreator(text));},

})


let ProfilePostsContainer = connect(mapStateToProps, mapDispatchToProps)(ProfilePosts)

export default ProfilePostsContainer;