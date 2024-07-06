import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { generateRandomId } from '@/lib/utils'
import { useChatStore } from '@/store'
import { useState } from 'react'
import type { Message } from '@/types'

interface ChatReplyPopoverProps {
	message: Message
}

export default function ChatReplyPopover({ message }: ChatReplyPopoverProps) {
	const [inputText, setInputText] = useState('')
	const { currentChat, currentUser, addReply } = useChatStore()

	const fromUser =
		currentChat?.type === 'dm'
			? currentUser
			: currentChat?.users?.find(user => user.id === currentUser?.id)

	const toUser = currentChat?.type === 'dm' ? currentChat.toUser : null

	const isError = !currentChat || !fromUser || !toUser || !currentUser

	if (isError) {
		return <></>
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='ghost'
					size='sm'
				>
					Reply
				</Button>
			</PopoverTrigger>
			<PopoverContent className='flex flex-col gap-2'>
				<Label htmlFor='input-text'>Reply to this message</Label>
				<Input
					id='input-text'
					value={inputText}
					onChange={e => setInputText(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							addReply(currentChat.id, message.id, {
								chatId: currentChat.id,
								content: inputText,
								fromUserId: currentUser?.id,
								toUserId: message.fromUserId,
								id: generateRandomId(),
								replies: [],
								timestamp: new Date().toISOString(),
							})

							setInputText('')
						}
					}}
				/>
			</PopoverContent>
		</Popover>
	)
}
