import s from "./ProfileAvatar.module.scss";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import * as PropTypes from "prop-types";
import React from "react";

function ProfileAvatar(props) {
    return (
        <div className={s.avatarWrapper}>
            <img className={s.avatar}
                 src={props.profile.avatar_medium} alt={"Avatar"}/>
            {props.owner && <div className={s.button}>
                <input accept="image/*" className={s.input} id="icon-button-file" type="file"
                       onChange={props.onChange}/>
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera/>
                    </IconButton> </label>
            </div>}
        </div>);
}

ProfileAvatar.propTypes = {
    profile: PropTypes.any,
    owner: PropTypes.bool,
    onChange: PropTypes.func
};

export default ProfileAvatar;