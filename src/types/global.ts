export type CardsetType = {
    id : number
    name: string
    to_language: {
        name: string
    }
    from_language: {
        name: string
    }
    theme: Array<string>,
    last_revision_date: string,
    owner: number
}


export type UserType = {
    id: number
    url: string
    username: string
    last_name: string
    first_name: string
    is_active: boolean
    profile: number
}

export type ProfileType = {
    status?: string | null

    avatar?: string
    avatar_small?: string
    avatar_big?: string
    avatar_medium?: string

    languages_know: Array<string>
    languages_learn: Array<string>

    user?: UserType

    age?: number
    birth_date: string
    hobbies: string
    about_me?: string
}



export type NavDataType = {
    id: number,
    link: string,
    content: string
}


export type PostType = {
    id : number
    text: string
    likesCount: number
}


export type PhotosType = {
    avatar_small: string
    avatar_big: string
    avatar_medium: string
}

export type UserListType = {
    avatar_small: string | null
    is_followed: boolean
    status: string | null
    user: UserType
}

export type FilterUsers = {
    username?: string
    friends?: "true" | "false"
    max_age?: number
    min_age?: number
}
export type MessageType = {
    id: number
    sender: UserMessageType
    text: string
    is_new: boolean
    date: string
}

export type UserMessageType = {
    id: number
    username: string
}

export type DialogType = {
    id: number
    participants: Array<UserMessageType>
    last_message: MessageType
}

export type CurrentDialogType = {
    id: number
    participants: Array<UserMessageType>
    messages: Array<MessageType>
}