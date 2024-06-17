import { cn } from '@/lib/utils'
import { useChatStore } from '@/store'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import ChatAvatar from './chat-avatar'
import ChatBottombar from './chat-bottombar'

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

				<AnimatePresence key={currentChat.id}>
					{currentChat?.messages?.map(message => (
						<motion.div
							key={message.id}
							layout
							initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
							animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
							exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
							transition={{
								opacity: { duration: 0.1 },
								layout: {
									type: 'spring',
									bounce: 0.3,
									duration: currentChat.messages.indexOf(message) * 0.05 + 0.2,
								},
							}}
							style={{
								originX: 0.5,
								originY: 0.5,
							}}
							className={cn(
								'flex flex-col gap-2 whitespace-pre-wrap p-4',
								message.fromUserId === fromUser.id
									? 'items-end'
									: 'items-start',
							)}
						>
							<div className='flex items-center gap-3'>
								{fromUser && toUser && message.toUserId !== toUser.id && (
									<ChatAvatar user={fromUser} />
								)}

								<span className='min-w-xs rounded-md bg-accent p-3'>
									{message.content}
								</span>

								{toUser && message.toUserId === toUser.id && (
									<ChatAvatar user={toUser} />
								)}
							</div>
						</motion.div>
					))}
				</AnimatePresence>
			</div>
			{/* Chat Input */}
			<ChatBottombar isMobile={isMobile} />
		</div>
	)
}
