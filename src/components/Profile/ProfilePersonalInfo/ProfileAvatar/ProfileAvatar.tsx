import s from "./ProfileAvatar.module.scss";
import React from "react";
import {ProfileType} from "../../../../types/global";
import placeholder from "../../../../assets/images/avatar_placeholder.png"
import {IconButton} from "@material-ui/core";
import {PhotoCamera} from "@material-ui/icons";

type PropsType = {
    profile: ProfileType
    owner: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const  ProfileAvatar : React.FC<PropsType> = ({profile, owner, onChange}) => {
    return (
        <div className={s.avatarWrapper}>
            { profile.avatar_small?
                <img className={s.avatar}
                     src={profile.avatar_medium} alt={"Avatar"}/> :
                <img className={s.avatar} src={placeholder} width={300} height={300} alt={"Avatar"}/>
            }
            {owner && <div className={s.button}>
                <input accept="image/*" className={s.input} id="icon-button-file" type="file"
                       onChange={onChange}/>
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera/>
                    </IconButton> </label>
            </div>}
        </div>);
}


export default ProfileAvatar;