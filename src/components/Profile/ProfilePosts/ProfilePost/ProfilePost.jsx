import React from 'react';
import s from './ProfilePost.module.scss'
import FontAwesomeIcon from "../../../FontAwesomeIcon";

const ProfilePost = (props) =>
{
    return (
            <div className={s.post}>
                <img className={s.image} alt="avatar" src={props.avatar/*"https://cache3.youla.io/files/images/780_780/5b/0f/5b0fc435b5fc2d3b38497323.jpg"*/}/>
                <div className={s.message}>{props.text}</div>
                <div><FontAwesomeIcon className="fas fa-heart" /> {props.likesCount}</div>
            </div>
    )
}

export default ProfilePost;