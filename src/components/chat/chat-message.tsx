import { cn } from '@/lib/utils'
import { useChatStore } from '@/store'
import type { Message } from '@/types'
import { useMemo } from 'react'
import ChatAvatar from './chat-avatar'
import ChatReplyPopover from './chat-reply-popover'
import ChatRepliesList from './chat-replies-list'

interface ChatMessageProps {
	message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
	const { currentChat, currentUser, query } = useChatStore()

	const fromUser =
		currentChat?.type === 'dm'
			? currentUser
			: currentChat?.users?.find(user => user.id === currentUser?.id)

	const toUser = currentChat?.type === 'dm' ? currentChat.toUser : null

	const isError = !currentChat || !fromUser || !toUser || !currentUser

	const replies = message.replies

	const isMatch = useMemo(
		() =>
			message.content.toLowerCase().includes(query.toLowerCase()) &&
			query.length > 0,
		[message.content, query],
	)

	if (isError) {
		return <></>
	}

	return (
		<div
			key={message.id}
			className={cn('flex flex-col gap-1.5 whitespace-pre-wrap p-4', {
				'items-end': message.fromUserId === currentUser.id,
				'items-start': message.fromUserId !== currentUser.id,
			})}
		>
			{/* Message Content & Avatar */}
			<div className='flex items-center gap-3'>
				{/* To User Avatar */}
				{message.toUserId === currentUser.id && <ChatAvatar user={toUser} />}

				{/* Message Content */}
				<span
					className={cn('min-w-xs rounded-md p-3', {
						'bg-accent': !isMatch,
						'bg-pink-100': isMatch,
					})}
				>
					{message.content}
				</span>

				{/* Current User Avatar */}
				{message.toUserId !== currentUser.id && <ChatAvatar user={fromUser} />}
			</div>

			{/* Reply */}
			<ChatReplyPopover message={message} />

			{/* Replies */}
			<ChatRepliesList replies={replies} />
		</div>
	)
}
