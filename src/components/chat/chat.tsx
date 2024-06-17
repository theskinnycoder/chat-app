import { useChatStore } from '@/store'
import ChatList from './chat-list'
import ChatTopbar from './chat-topbar'

interface ChatProps {
	isMobile: boolean
}

export default function Chat({ isMobile }: ChatProps) {
	const { currentChat } = useChatStore()

	if (!currentChat) {
		return (
			<div className='flex h-full w-full items-center justify-center'>
				Select a chat
			</div>
		)
	}

	return (
		<div className='flex h-full w-full flex-col justify-between'>
			<ChatTopbar />

			<ChatList
				key={currentChat.messages.length}
				isMobile={isMobile}
			/>
		</div>
	)
}
