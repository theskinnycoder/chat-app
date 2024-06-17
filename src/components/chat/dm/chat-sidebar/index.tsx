import { useChatStore } from '@/store'
import ChatSidebarButton from './chat-sidebar-button'
import ChatSidebarHeader from './chat-sidebar-header'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface SidebarProps {
	isCollapsed: boolean
	isMobile: boolean
}

export default function ChatSidebar({ isCollapsed }: SidebarProps) {
	const { chats } = useChatStore()

	const [searchText, setSearchText] = useState('')

	const filteredChats = chats.filter(
		chat =>
			chat.type === 'dm' &&
			chat.toUser.name.toLowerCase().includes(searchText.toLowerCase()),
	)

	return (
		<div
			data-collapsed={isCollapsed}
			className='group relative flex h-full flex-col gap-4 p-2 data-[collapsed=true]:p-2 '
		>
			{/* Chat Sidebar Header */}
			{!isCollapsed && <ChatSidebarHeader />}

			{/* Search */}
			{!isCollapsed && (
				<Input
					placeholder='Search chats'
					value={searchText}
					onChange={e => setSearchText(e.target.value)}
					className='max-w-xs'
				/>
			)}

			{/* Chat Sidebar List Buttons */}
			<nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
				{filteredChats.map(chat => (
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
