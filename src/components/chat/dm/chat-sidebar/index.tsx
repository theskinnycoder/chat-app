import { useChatStore } from '@/store'
import ChatSidebarButton from './chat-sidebar-button'
import ChatSidebarHeader from './chat-sidebar-header'

interface SidebarProps {
	isCollapsed: boolean
	isMobile: boolean
}

export default function ChatSidebar({ isCollapsed }: SidebarProps) {
	const { chats } = useChatStore()

	return (
		<div
			data-collapsed={isCollapsed}
			className='group relative flex h-full flex-col gap-4 p-2 data-[collapsed=true]:p-2 '
		>
			{/* Chat Sidebar Header */}
			{!isCollapsed && <ChatSidebarHeader />}

			{/* Chat Sidebar List Buttons */}
			<nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
				{chats.map(chat => (
					<ChatSidebarButton
						key={chat.id}
						isCollapsed={isCollapsed}
						chat={chat}
					/>
				))}
			</nav>
		</div>
	)
}
