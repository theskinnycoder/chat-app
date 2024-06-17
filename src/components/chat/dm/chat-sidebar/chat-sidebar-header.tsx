import { Button } from '@/components/ui/button'
import { useChatStore } from '@/store'
import { SquarePen } from 'lucide-react'
import NewChatDialog from '../new-chat-dialog'

export default function ChatSidebarHeader() {
	const { users, chats, currentUser } = useChatStore()

	const nonExistingChats = users.filter(user => {
		return (
			!chats.find(chat => chat.type === 'dm' && chat.toUser.id === user.id) &&
			user.id !== currentUser?.id
		)
	})

	return (
		<div className='flex items-center justify-between p-2'>
			{/* Sidebar Header */}
			<div className='flex items-center gap-2 text-xl'>
				{/* Title */}
				<h6 className='font-medium'>Chats</h6>

				{/* Number of chats */}
				<span className='text-base text-muted-foreground'>
					({chats.length})
				</span>
			</div>

			{/* Sidebar Header Actions */}
			{/* Create New Chat */}
			{nonExistingChats.length > 0 && (
				<NewChatDialog>
					<Button
						variant='ghost'
						size='icon'
					>
						<SquarePen className='size-5' />
					</Button>
				</NewChatDialog>
			)}

			{/* Create New Chat */}
			{nonExistingChats.length === 0 && (
				<Button
					variant='ghost'
					size='icon'
					disabled
				>
					<SquarePen className='size-5' />
				</Button>
			)}
		</div>
	)
}
