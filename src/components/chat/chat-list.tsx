import { cn } from '@/lib/utils'
import { useChatStore } from '@/store'
import { useEffect, useRef } from 'react'
import ChatBottombar from './chat-bottombar'
import ChatMessage from './chat-message'

interface ChatListProps {
	isMobile: boolean
}

export default function ChatList({ isMobile }: ChatListProps) {
	const { currentChat, currentUser } = useChatStore()

	const messagesContainerRef = useRef<HTMLDivElement>(null)

	const fromUser =
		currentChat?.type === 'dm'
			? currentUser
			: currentChat?.users?.find(user => user.id === currentUser?.id)

	const toUser = currentChat?.type === 'dm' ? currentChat.toUser : null
	const toUsers =
		currentChat?.type === 'group'
			? currentChat.users.filter(user => user.id !== currentUser?.id)
			: []

	const isError =
		(currentChat?.type === 'group' && toUsers.length === 0) ||
		(currentChat?.type === 'dm' && !toUser) ||
		!currentChat ||
		!fromUser

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight
		}
	}, [currentChat?.messages])

	if (isError) {
		return <></>
	}

	return (
		<div className='flex h-full w-full flex-col overflow-y-auto overflow-x-hidden'>
			<div
				ref={messagesContainerRef}
				className='flex h-full w-full flex-col overflow-y-auto overflow-x-hidden'
			>
				{/* Header */}
				<span
					className={cn('py-4 text-center text-xs text-muted-foreground/50')}
				>
					This is the start of your conversation with {currentChat.name}
				</span>

				{currentChat?.messages?.map(message => (
					<ChatMessage
						key={message.id}
						message={message}
					/>
				))}
			</div>

			{/* Chat Input */}
			<ChatBottombar isMobile={isMobile} />
		</div>
	)
}
