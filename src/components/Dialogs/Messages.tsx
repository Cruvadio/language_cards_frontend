import React, {useEffect, useState} from 'react'
import s from './Dialogs.module.scss'
import {MessageType} from '../../types/global'
import {useDispatch, useSelector} from 'react-redux'
import {addClassName} from '../common/utils/helpers/helpers'
import {Avatar, Button, Popover, Spin} from 'antd'
import {CheckCircleFilled, UserOutlined} from '@ant-design/icons/lib'
import {MessagesForm} from './MessagesForm'
import {actions, addMessage, getMessages, sendMessage} from '../../redux/reducers/dialogs_reducer'
import WebSocketInstance from '../../api/websocket'
import {CurrentUserSelector} from '../../redux/reducers/users_selectors'
import {
    FetchingSelector,
    IsEndSelector,
    MessagesSelector,
    PageSizeSelector
} from '../../redux/reducers/dialogs_selectors'
import {throttle} from 'lodash'

type OwnProps = {
    currentDialog: number | null
}


const Messages: React.FC<OwnProps> =
    ({
         currentDialog
     }) => {

        const [page, setPage] = useState(1)
        const currentUser = useSelector(CurrentUserSelector)
        const messages = useSelector(MessagesSelector)
        const pageSize = useSelector(PageSizeSelector)
        const isFetching = useSelector(FetchingSelector)
        const isEnd = useSelector(IsEndSelector)
        const [shouldJump, setJump] = useState(true)

        const dispatch = useDispatch()

        let messageBody = React.createRef<HTMLDivElement>()

        useEffect(() => {
            setJump(true)
            dispatch(actions.clearMessages())
            dispatch(actions.setEnd(false))
            if (currentDialog) {
                WebSocketInstance.connect(currentDialog, pageSize)
                waitForSocketConnection(() => {
                    WebSocketInstance.addCallbacks(loadMessagesHandler, addMessageHandler, readMessages)
                    dispatch(getMessages(1, currentDialog))
                })
            }
            setPage(1)
            return () => {
                WebSocketInstance.disconnect()
            }
        }, [currentDialog, pageSize])


        const waitForSocketConnection = (callback: () => void) => {
            setTimeout(
                function () {
                    if (WebSocketInstance.state() === 1) {
                        console.log('Connection is made')
                        callback()
                        return
                    } else {
                        console.log('waiting for connection')
                        waitForSocketConnection(callback)
                    }
                }, 100
            )
        }


        useEffect(() => {
            if (shouldJump)
            if (messageBody.current) {
                messageBody.current.scrollTop = messageBody.current.scrollHeight - messageBody.current.clientHeight
            }
        }, [messages, isFetching, shouldJump])

        const loadMessagesHandler = (payload: { messages: Array<MessageType>, next_page: number }) => {
            if (payload.messages.length === 0){
                dispatch(actions.setEnd(true))
            }
            else{
                dispatch(actions.setMessages(payload.messages))
            }

            dispatch(actions.toggleFetching(false))
            setJump(false)

        }

        const addMessageHandler = (payload: { message: MessageType }) => {
            dispatch(addMessage(payload.message))
            setJump(true)
        }

        const readMessages = (payload: { message: number, dialog: number }) => {
            console.log('read')
        }

        const content = (
            <div>
                <Button>Delete</Button>
            </div>
        )

        if (!currentDialog) {
            return (
                <div>
                    Select dialog in the list
                </div>
            )
        }

        const ifNeedsMoreContent = () => {
            if (messageBody.current) {
                const pixels = messageBody.current.clientHeight - messageBody.current.scrollTop
                if ((messageBody.current.clientHeight - pixels < 100) && !isEnd) {
                    dispatch(getMessages(page + 1, currentDialog))
                    setPage(page + 1)
                }
            }
        }

        if (isFetching) {
            return (
                <div className={s.spinner}>
                    <Spin size='large'/>
                </div>
            )
        }

        return (
            <div className={s.messagesOuter} ref={messageBody} onScroll={throttle(ifNeedsMoreContent, 1000)}>
                <ul className={s.messages}>
                    {messages.map(m => {
                        if (currentUser) {
                            let classes = s.message
                            if (currentUser.userID === m.sender.id) classes = addClassName(classes, s.right)
                            return (
                                <li key={m.id}>
                                    <Popover content={content} title="Actions" trigger="hover">
                                        <div className={classes}>
                                            <div className={s.select}><CheckCircleFilled/></div>
                                            <div className={s.meta}>
                                                <div className={s.avatar}>{m.sender.profile.avatar_small ?
                                                    <Avatar size={'large'} src={m.sender.profile.avatar_small}/> :
                                                    <Avatar size={'large'} icon={<UserOutlined/>}/>}</div>
                                                <div className={s.info}>
                                                    <div className={s.username}>{m.sender.username}</div>
                                                    <div className={s.text}>{m.text}</div>
                                                </div>
                                            </div>
                                            <time dateTime={m.date}>{new Date(m.date).toDateString()}</time>
                                        </div>
                                    </Popover>
                                </li>
                            )

                        }
                    }).reverse()}
                </ul>
                <div>
                    <MessagesForm sendMessage={sendMessage} currentDialog={currentDialog}/>
                </div>
            </div>
        )
    }
export default Messages