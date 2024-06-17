import { Button } from '@/components/ui/button'
import { useChatStore } from '@/store'
import { MoreHorizontal, SquarePen } from 'lucide-react'

export default function ChatSidebarHeader() {
	const { chats } = useChatStore()

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
			<div className='flex items-center gap-1'>
				{/* Actions Dropdown */}
				<Button
					variant='ghost'
					size='icon'
				>
					<MoreHorizontal className='size-5' />
				</Button>

				{/* Create New Chat */}
				<Button
					variant='ghost'
					size='icon'
				>
					<SquarePen className='size-5' />
				</Button>
			</div>
		</div>
	)
}
