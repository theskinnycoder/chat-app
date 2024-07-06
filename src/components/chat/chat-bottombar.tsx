import { EmojiPicker } from '@/components/emoji-picker'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { generateRandomId } from '@/lib/utils'
import { useChatStore } from '@/store'
import type { Message } from '@/types'
import { AnimatePresence, motion } from 'framer-motion'
import {
	FileImage,
	Mic,
	Paperclip,
	PlusCircle,
	SendHorizontal,
	ThumbsUp,
} from 'lucide-react'
import { useRef, useState } from 'react'

interface ChatBottombarProps {
	isMobile: boolean
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }]

export default function ChatBottombar({ isMobile }: ChatBottombarProps) {
	const { addMessage, currentChat, currentUser } = useChatStore()
	const [message, setMessage] = useState('')
	const inputRef = useRef<HTMLTextAreaElement>(null)

	const fromUser =
		currentChat?.type === 'dm'
			? currentUser
			: currentChat?.users?.find(user => user.id === currentUser?.id)

	if (!fromUser || !currentChat) {
		return <></>
	}

	const handleThumbsUp = () => {
		const newMessage: Message = {
			id: generateRandomId(),
			content: '👍',
			fromUserId: fromUser.id,
			...(currentChat.type === 'dm' && {
				toUserId: currentChat.toUser.id,
			}),
			timestamp: new Date().toISOString(),
			chatId: currentChat.id,
			replies: [],
		}
		addMessage(currentChat.id, newMessage)
		setMessage('')
	}

	const handleSend = () => {
		if (message.trim()) {
			const newMessage: Message = {
				id: generateRandomId(),
				content: message,
				fromUserId: fromUser.id,
				...(currentChat.type === 'dm' && {
					toUserId: currentChat.toUser.id,
				}),
				timestamp: new Date().toISOString(),
				chatId: currentChat.id,
				replies: [],
			}
			addMessage(currentChat.id, newMessage)
			setMessage('')

			if (inputRef.current) {
				inputRef.current.focus()
			}
		}
	}

	const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault()
			handleSend()
		}

		if (event.key === 'Enter' && event.shiftKey) {
			event.preventDefault()
			setMessage(prev => prev + '\n')
		}
	}

	return (
		<div className='flex w-full items-center justify-between gap-2 p-2'>
			<div className='flex'>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant='ghost'
							size='icon'
						>
							<PlusCircle
								size={20}
								className='text-muted-foreground'
							/>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						side='top'
						className='w-full p-2'
					>
						{message.trim() || isMobile ? (
							<div className='flex gap-2'>
								<Button
									variant='ghost'
									size='icon'
								>
									<Mic
										size={20}
										className='text-muted-foreground'
									/>
								</Button>

								{BottombarIcons.map((icon, index) => (
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
						) : (
							<Button
								variant='ghost'
								size='icon'
							>
								<Mic
									size={20}
									className='text-muted-foreground'
								/>
							</Button>
						)}
					</PopoverContent>
				</Popover>

				{!message.trim() && !isMobile && (
					<div className='flex'>
						{BottombarIcons.map((icon, index) => (
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
				)}
			</div>

			<AnimatePresence initial={false}>
				<motion.div
					key='input'
					className='relative w-full'
					layout
					initial={{ opacity: 0, scale: 1 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 1 }}
					transition={{
						opacity: { duration: 0.05 },
						layout: {
							type: 'spring',
							bounce: 0.15,
						},
					}}
				>
					<Textarea
						autoComplete='off'
						value={message}
						ref={inputRef}
						onKeyDown={handleKeyPress}
						onChange={e => setMessage(e.target.value)}
						name='message'
						placeholder='Aa'
						className='flex h-9 w-full resize-none items-center overflow-hidden rounded-full border bg-background'
					/>
					<div className='absolute bottom-0.5 right-2'>
						<EmojiPicker
							onChange={value => {
								setMessage(message + value)
								if (inputRef.current) {
									inputRef.current.focus()
								}
							}}
						/>
					</div>
				</motion.div>

				{message.trim() ? (
					<Button
						variant='ghost'
						size='icon'
						onClick={handleSend}
					>
						<SendHorizontal
							size={20}
							className='text-muted-foreground'
						/>
					</Button>
				) : (
					<Button
						variant='ghost'
						size='icon'
						onClick={handleThumbsUp}
					>
						<ThumbsUp
							size={20}
							className='text-muted-foreground'
						/>
					</Button>
				)}
			</AnimatePresence>
		</div>
	)
}
