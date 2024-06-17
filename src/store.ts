import type { Chat, Message, User } from '@/types'
import { create } from 'zustand'

// A store for a chat application
type Store = {
	// The list of users
	users: User[]

	// The current user
	currentUser: User | null

	// The current chat
	currentChat: Chat | null
	setCurrentChat: (chat: Chat) => void

	// The list of chats
	chats: Chat[]
	setChats: (chats: Chat[]) => void
	addChat: (chat: Chat) => void
	addMessage: (chatId: string, message: Message) => void
}

const dummyUsers: User[] = [
	{
		id: '1',
		name: 'John Doe',
		avatar: 'https://randomuser.me/api/portraits',
	},
	{
		id: '2',
		name: 'Jane Doe',
		avatar: 'https://randomuser.me/api/portraits',
	},
	{
		id: '3',
		name: 'Alice',
		avatar: 'https://randomuser.me/api/portraits',
	},
	{
		id: '4',
		name: 'Bob',
		avatar: 'https://randomuser.me/api/portraits',
	},
	{
		id: '5',
		name: 'Charlie',
		avatar: 'https://randomuser.me/api/portraits',
	},
]

const currentUser = dummyUsers[0]

const dummyChats: Chat[] = [
	{
		id: '1',
		type: 'dm',
		toUser: dummyUsers[1],
		messages: [
			{
				id: '1',
				content: 'Hello!',
				timestamp: new Date().toISOString(),
				fromUserId: currentUser.id,
				toUserId: dummyUsers[1].id,
				chatId: '1',
			},
			{
				id: '2',
				content: 'Hi!',
				timestamp: new Date().toISOString(),
				fromUserId: dummyUsers[1].id,
				toUserId: currentUser.id,
				chatId: '1',
			},
			{
				id: '3',
				content: 'How are you?',
				timestamp: new Date().toISOString(),
				fromUserId: currentUser.id,
				toUserId: dummyUsers[1].id,
				chatId: '1',
			},
		],
		fromUser: currentUser,
		name: dummyUsers[1].name,
		createdAt: new Date().toISOString(),
	},
	{
		id: '2',
		type: 'dm',
		toUser: dummyUsers[2],
		messages: [],
		fromUser: currentUser,
		name: dummyUsers[2].name,
		createdAt: new Date().toISOString(),
	},
	{
		id: '3',
		type: 'dm',
		toUser: dummyUsers[3],
		messages: [],
		fromUser: currentUser,
		name: dummyUsers[3].name,
		createdAt: new Date().toISOString(),
	},
	{
		id: '4',
		type: 'dm',
		toUser: dummyUsers[4],
		messages: [],
		fromUser: currentUser,
		name: dummyUsers[4].name,
		createdAt: new Date().toISOString(),
	},
]

export const useChatStore = create<Store>(set => ({
	users: dummyUsers,

	currentUser: currentUser,

	currentChat: dummyChats[0],
	setCurrentChat: chat => set(() => ({ currentChat: chat })),

	chats: dummyChats,
	setChats: chats => set(() => ({ chats })),
	addChat: chat => set(state => ({ chats: [...state.chats, chat] })),
	addMessage: (chatId, message) => {
		set(state => ({
			chats: state.chats.map(chat => {
				if (chat.id === chatId) {
					return {
						...chat,
						messages: [...chat.messages, message],
					}
				}
				return chat
			}),
		}))
		set(state => ({
			currentChat: {
				...state.currentChat!,
				messages: [...state.currentChat!.messages, message],
			},
		}))
	},
}))
