import {tokenAPI} from './token_api'
import {MessageType, SendMessageType, WebsocketActionType, WebsocketType} from '../types/global'

class WebSocketService {
    socketRef: WebSocket | null

    static instance: WebSocketService | null = null

    callbacks: any = {}

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService()
        }

        return WebSocketService.instance
    }

    constructor() {
        this.socketRef = null
    }

    async connect(dialogID: number, pageSize: number) {
        const token = await tokenAPI.getAccessToken()
        const path = `ws://127.0.0.1:8000/ws/dialogs/${dialogID}/?token=${token}`
        this.socketRef = new WebSocket(path)
        this.socketRef.onopen = () => {
            console.log('WebSocket open')
        }

        this.socketRef.onmessage = (e: MessageEvent) => {
            this.socketNewMessage(e.data)
        }

        this.socketRef.onerror = (e) => {
            console.log(e)
        }

        this.socketRef.onclose = () => {
            console.log('WebSocket closed')
        }

    }

    disconnect(){
        this.socketRef?.close()
    }

    socketNewMessage(data: string) {
        const parsedData = JSON.parse(data)
        const action = parsedData.action as WebsocketActionType
        const payload = parsedData.payload
        if (Object.keys(this.callbacks).length === 0) {
            return
        }
        this.callbacks[action](payload)
    }


    loadMessages(page: number, pageSize: number, dialogID: number) {
        this.sendData<{
            page: number,
            page_size: number,
            dialog: number
        }>({
            action: 'LOAD_MESSAGES', payload: {
                page: page,
                dialog: dialogID,
                page_size: pageSize
            }
        })
    }

    addMessage(message: SendMessageType) {
        this.sendData<SendMessageType>({action: 'ADD_MESSAGE', payload: message})
    }

    readMessage(messageID: number, dialogID: number) {
        this.sendData<{ message: number, dialog: number }>({
            action: 'READ_MESSAGE', payload: {
                dialog: dialogID,
                message: messageID
            }
        })
    }

    sendData<T = {}>(data: WebsocketType<T>) {
        try {
            this.socketRef?.send(JSON.stringify({...data}))
        } catch (e) {
            console.log(e.message)
        }
    }

    addCallbacks(loadCallback: (payload: { messages: Array<MessageType>, next_page: number }) => void,
                 addCallback: (payload: { message: MessageType }) => void,
                 readCallback: (payload: { dialog: number, message: number }) => void) {
        this.callbacks['LOAD_MESSAGES'] = loadCallback
        this.callbacks['ADD_MESSAGE'] = addCallback
        this.callbacks['READ_MESSAGE'] = readCallback
    }

    state() {
        return this.socketRef?.readyState
    }

    async reconnect (dialogID: number, pageSize: number){
        if (this.state() !== 1){
            await this.connect(dialogID, pageSize)
        }
    }

}

const WebSocketInstance = WebSocketService.getInstance()

export default WebSocketInstance