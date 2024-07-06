import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useChatStore } from '@/store'
import type { Reply } from '@/types'
import ChatAvatar from './chat-avatar'

interface ChatReplyMessageProps {
	reply: Reply
}

export default function ChatReplyMessage({ reply }: ChatReplyMessageProps) {
	const { currentUser, currentChat, query } = useChatStore()

	const fromUser =
		currentChat?.type === 'dm'
			? currentUser
			: currentChat?.users?.find(user => user.id === currentUser?.id)

	const toUser = currentChat?.type === 'dm' ? currentChat.toUser : null

	const isMatch = useMemo(
		() =>
			reply.content.toLowerCase().includes(query.toLowerCase()) &&
			query.length > 0,
		[reply.content, query],
	)

	if (!currentUser || !fromUser || !toUser || !currentChat) {
		return <></>
	}

	return (
		<div
			className='flex items-center gap-3'
			style={{
				marginLeft: '1.5rem',
				transform: 'scale(0.95)',
			}}
		>
			{/* To User Avatar */}
			{reply.toUserId === currentUser.id && <ChatAvatar user={toUser} />}

			{/* Current User Avatar */}
			{reply.toUserId !== currentUser.id && <ChatAvatar user={fromUser} />}

			{/* Message Content */}
			<span
				className={cn('min-w-xs rounded-md p-3', {
					'bg-accent': !isMatch,
					'bg-pink-100': isMatch,
				})}
			>
				{reply.content}
			</span>
		</div>
	)
}
