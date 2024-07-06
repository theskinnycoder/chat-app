import { Button } from '@/components/ui/button'
import { useChatStore } from '@/store'
import { Info, Phone, Video } from 'lucide-react'
import ChatAvatar from './chat-avatar'
import { Input } from '@/components/ui/input'

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }]

export default function ChatTopbar() {
	const { currentChat, currentUser, query, setQuery } = useChatStore()

	const toUser = currentChat?.type === 'dm' ? currentChat.toUser : null
	const toUsers =
		currentChat?.type === 'group'
			? currentChat.users.filter(user => user.id !== currentUser?.id)
			: []

	const isError =
		(currentChat?.type === 'group' && toUsers.length === 0) ||
		(currentChat?.type === 'dm' && !toUser) ||
		!currentChat

	if (isError) {
		return <></>
	}

	return (
		<div className='flex h-20 w-full items-center justify-between border-b p-4'>
			<div className='flex items-center gap-2'>
				{currentChat?.type === 'dm' && !!toUser && (
					<>
						<ChatAvatar user={toUser} />
						<div className='flex flex-col'>
							<span className='font-medium'>{toUser.name}</span>
							<span className='text-xs'>Active 2 mins ago</span>
						</div>
					</>
				)}
			</div>

			<div className='flex items-center gap-8'>
				{/* Search bar */}
				<Input
					value={query}
					onChange={e => setQuery(e.target.value)}
					type='search'
					placeholder='Search messages...'
				/>

				{TopbarIcons.map((icon, index) => (
					<Button
						key={index}
						variant='ghost'
						size='icon'
					>
						<icon.icon
							size={20}
							className='text-muted-foreground'
						/>
					</Button>
				))}
			</div>
		</div>
	)
}
