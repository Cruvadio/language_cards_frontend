import React, {useState} from 'react'
import {Layout} from 'antd'
import s from './Dialogs.module.scss'
import {unionClasses} from '../common/utils/helpers/helpers'
import {Chats} from './Chats'
import Messages from './Messages'


const {Header, Sider, Content, Footer} = Layout

const Dialogs= () => {

    const [currentDialog, setCurrentDialog] = useState<null | number>(null)

    return (
        <div className={s.bg}>
            <div className={unionClasses(s.container)}>
                <Chats setCurrentDialog={setCurrentDialog}
                />
                <Messages currentDialog={currentDialog}/>
            </div>
        </div>
    )
}

export default Dialogs