import React, {useEffect, useState} from 'react'
import s from './Dialogs.module.scss'
import {addClassName} from '../common/utils/helpers/helpers'
import {Avatar} from 'antd'
import {DialogType, UserMessageType} from '../../types/global'
import {UserOutlined} from '@ant-design/icons/lib'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../redux/store'
import {CurrentUserSelector} from '../../redux/reducers/users_selectors'
import {CurrentDialogSelector, DialogsSelector} from '../../redux/reducers/dialogs_selectors'
import {getDialogs} from '../../redux/reducers/dialogs_reducer'

type PropsType = {
    setCurrentDialog: (currentDialog: null | number) => void
}

export const Chats: React.FC<PropsType> = ({
                                               setCurrentDialog,
                                              /* getDialogs,*/
                                           }) => {
    const [page, setPage] = useState(1)
    const currentDialog = useSelector(CurrentDialogSelector)
    const dialogs = useSelector(DialogsSelector)
    const currentUser = useSelector(CurrentUserSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDialogs(page))
    }, [getDialogs, page])


    const selectParticipant = (participants: Array<UserMessageType>) => {
        for (let p of participants) {
            if (p.id !== currentUser.userID) return p
        }
        return participants[0]
    }

    const showParticipants = (participants: Array<UserMessageType>) => {
            return participants.reduce((p, item, index) => {
                return index !== 0 ? p + ', ' + item.username : item.username
            }, '')
    }

    return (
        <div className={s.chats}>
            <ul>
                {dialogs.map(d => {
                    let date = new Date(d.last_message.date)
                    let p;

                    const handleClick = () => {
                        setCurrentDialog(d.id)
                    }
                    if (d.type === 'D'){
                        p = selectParticipant(d.participants)
                    }

                    return (
                        <li key={d.id} className={currentDialog === d.id ? addClassName(s.li, s.active) : s.li}
                            onClick={handleClick}>
                            <div className={s.dialog}>
                                <div className={s.avatar}>
                                    {(p && p.profile.avatar_small)?
                                        <Avatar size='large' src={p.profile.avatar_small}/>:
                                        <Avatar size='large' icon={<UserOutlined/>}/>
                                    }

                                </div>
                                <div className={s.meta}>
                                    <b>{p ? p.username: showParticipants(d.participants)}</b><br/>
                                    <div className={s.message}>
                                        <div>{d.last_message.text}</div>
                                        <time dateTime={d.last_message.date}>{date.toDateString()}</time>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}