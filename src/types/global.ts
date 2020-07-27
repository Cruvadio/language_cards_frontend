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
    user: UserType
}