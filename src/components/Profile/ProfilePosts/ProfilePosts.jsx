import React from 'react';
import s from './ProfilePosts.module.scss'
import FontAwesomeIcon from "../../FontAwesomeIcon";
import Button from "../../Button/Button";
import ProfilePost from "./ProfilePost/ProfilePost";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/reducers/profile-reducer";

const ProfilePosts = (props) => {


    let postElements = props.posts.map((post) => {
        return <ProfilePost text={post.text} key={post.id} avatar={post.avatar} likesCount={post.likesCount}/>
    })

    let newPostElement = React.createRef();

    let addPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updatePostText(text);
    }

    return (
        <div className={s.statistics}>
            <div className={s.header}>
                {props.headerName}
            </div>

            <div>
                <textarea onChange={onPostChange} placeholder={props.placeholder} ref={newPostElement} value={props.newPostText}/>
                <Button onClick={addPost} name={props.submit}/>
            </div>
            {postElements}

        </div>

    )
}

export default ProfilePosts;