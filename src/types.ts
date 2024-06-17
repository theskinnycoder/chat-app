export interface Message {
	id: string
	chatId: string
	fromUserId: string
	toUserId?: string
	content: string
	timestamp: string
}

export interface DMChat {
	id: string
	name: string
	type: 'dm'
	fromUser: User
	toUser: User
	messages: Message[]
	createdAt: string
}

export interface GroupChat {
	id: string
	name: string
	type: 'group'
	users: User[]
	messages: Message[]
	createdAt: string
}

export type Chat = DMChat | GroupChat

export interface User {
	id: string
	avatar: string
	name: string
}
