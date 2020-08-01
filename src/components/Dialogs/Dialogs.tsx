import React from 'react'
import {Avatar, Layout} from 'antd'
import {DialogType} from '../../types/global'
import s from './Dialogs.module.scss'
import {addClassName, unionClasses} from '../common/utils/helpers/helpers'
import {UserOutlined} from '@ant-design/icons'

const {Header, Sider, Content, Footer} = Layout


const dialogs: Array<DialogType> = [
    {
        'id': 6,
        'participants': [
            {
                'id': 15,
                'username': 'Nagibator'
            },
            {
                'id': 1,
                'username': 'Cruvadio'
            }
        ],
        'last_message': {
            'id': 17,
            'sender': {
                'id': 1,
                'username': 'Cruvadio'
            },
            'text': '4444444444444444',
            'is_new': true,
            'date': '2020-07-30T22:43:29.257787+03:00'
        }
    },
    {
        'id': 7,
        'participants': [
            {
                'id': 12,
                'username': 'AnotherUser'
            },
            {
                'id': 1,
                'username': 'Cruvadio'
            }
        ],
        'last_message': {
            'id': 16,
            'sender': {
                'id': 12,
                'username': 'AnotherUser'
            },
            'text': '777777777',
            'is_new': true,
            'date': '2020-07-30T22:42:44.600972+03:00'
        }
    },
    {
        'id': 8,
        'participants': [
            {
                'id': 15,
                'username': 'Nagibator'
            },
            {
                'id': 1,
                'username': 'Cruvadio'
            }
        ],
        'last_message': {
            'id': 17,
            'sender': {
                'id': 1,
                'username': 'Cruvadio'
            },
            'text': '4444444444444444',
            'is_new': true,
            'date': '2020-07-30T22:43:29.257787+03:00'
        }
    }
]


const currentDialog = {
    'id': 6,
    'participants': [
        {
            'id': 15,
            'username': 'Nagibator'
        },
        {
            'id': 1,
            'username': 'Cruvadio'
        }
    ],
    'messages': [
        {
            'id': 15,
            'sender': {
                'id': 15,
                'username': 'Nagibator'
            },
            'text': '11111111111111111111',
            'is_new': true,
            'date': '2020-07-30T22:26:36.336054+03:00'
        },
        {
            'id': 10,
            'sender': {
                'id': 1,
                'username': 'Cruvadio'
            },
            'text': 'Hello!asfffffffffffffffffffwesatggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggdsgvsHGKDKLSDGHKDGHPLGDKFGJDSKLGJDLFKGJLDSKGAHOFKLDSFSDLKFHSDLKFHSDLKFHDSKLFHSDLKFHSDLKFJDSFDSFFDSFSDFSDFSDFASDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDF',
            'is_new': true,
            'date': '2020-07-30T22:29:17.687064+03:00'
        },
        {
            'id': 17,
            'sender': {
                'id': 1,
                'username': 'Cruvadio'
            },
            'text': '4444444444444444',
            'is_new': true,
            'date': '2020-07-30T22:43:29.257787+03:00'
        }
    ]
}


const Chats = () => {
    return (
        <div className={s.chats}>
            <ul>
                {dialogs.map(d => {
                    let date = new Date(d.last_message.date)
                    return (
                        <li key={d.id} className={currentDialog.id === d.id ? addClassName(s.li, s.active) : s.li}>
                            <div className={s.dialog}>
                                <div className={s.avatar}>
                                <Avatar size='large'  icon={<UserOutlined/>}/>
                                </div>
                                <div className={s.meta}>
                                    <b>{d.participants[0].username}</b><br/>
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

const Messages = () => {
    return (
        <div>
            Messages
        </div>
    )
}

const Dialogs = () => {

    return (
        <div className={s.bg}>
            <div className={unionClasses(s.container)}>
                <Chats/>
                <Messages/>
            </div>
        </div>
    )
}


export default Dialogs