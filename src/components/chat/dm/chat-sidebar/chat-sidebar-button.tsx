import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useChatStore } from '@/store'
import type { Chat } from '@/types'
import ChatAvatar from '../../chat-avatar'

interface ChatSidebarButtonProps {
	isCollapsed: boolean
	chat: Chat
}

export default function ChatSidebarButton({
	isCollapsed,
	chat,
}: ChatSidebarButtonProps) {
	const { currentChat, setCurrentChat } = useChatStore()

	return (
		<Tooltip delayDuration={0}>
			<TooltipTrigger asChild>
				<Button
					variant={currentChat?.id === chat.id ? 'default' : 'ghost'}
					size={isCollapsed ? 'xl' : 'icon'}
					onClick={() => {
						setCurrentChat(chat)
					}}
					className='flex h-auto w-full items-center justify-start gap-1 p-2.5'
				>
					{/* Avatar of the chat */}
					{chat.type === 'dm' && <ChatAvatar user={chat.toUser} />}

					{isCollapsed && <span className='sr-only'>{chat.name}</span>}

					{/* Details of the chat */}
					{!isCollapsed && (
						<div className='ml-1 flex max-w-28 flex-col items-start'>
							{/* Name of the chat */}
							<span>{chat.name}</span>

							{/* Preview of last message */}
							{chat.messages.length > 0 && (
								<span className='truncate text-xs italic text-muted-foreground'>
									{chat.messages[chat.messages.length - 1].content}
								</span>
							)}
						</div>
					)}
				</Button>
			</TooltipTrigger>

			{isCollapsed && <TooltipContent side='right'>{chat.name}</TooltipContent>}
		</Tooltip>
	)
}
