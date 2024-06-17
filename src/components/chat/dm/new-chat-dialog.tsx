import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { RadioGroup } from '@/components/ui/radio-group'
import { useChatStore } from '@/store'
import { useState, type PropsWithChildren } from 'react'
import RadioCard from '@/components/ui/radio-card'
import ChatAvatar from '../chat-avatar'
import { Button } from '@/components/ui/button'
import { generateRandomId } from '@/lib/utils'

interface NewChatDialogProps extends PropsWithChildren {}

export default function NewChatDialog({ children }: NewChatDialogProps) {
	const [open, setOpen] = useState(false)
	const { users, chats, currentUser, addChat, setCurrentChat } = useChatStore()
	const [selectedUser, setSelectedUser] = useState('')

	const nonExistingChats = users.filter(user => {
		return (
			!chats.find(chat => chat.type === 'dm' && chat.toUser.id === user.id) &&
			user.id !== currentUser?.id
		)
	})

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Whom do you wanna text?</DialogTitle>
					<DialogDescription>
						Search for a user to start a new chat.
					</DialogDescription>
				</DialogHeader>

				<form
					onSubmit={e => {
						e.preventDefault()

						if (!currentUser) return
						const user = users.find(user => user.id === selectedUser)

						if (user) {
							const id = generateRandomId()

							addChat({
								id,
								type: 'dm',
								toUser: user,
								messages: [],
								fromUser: currentUser,
								name: user.name,
								createdAt: new Date().toISOString(),
							})

							setCurrentChat({
								id,
								type: 'dm',
								toUser: user,
								messages: [],
								fromUser: currentUser,
								name: user.name,
								createdAt: new Date().toISOString(),
							})
						}

						setOpen(false)
					}}
				>
					{/* Search for a user */}
					<RadioGroup
						value={selectedUser}
						onValueChange={setSelectedUser}
						className='mt-8 flex items-center gap-2'
					>
						{nonExistingChats.map(user => (
							<RadioCard
								key={user.id}
								value={user.id}
							>
								<ChatAvatar user={user} />
								<span>{user.name}</span>
							</RadioCard>
						))}
					</RadioGroup>

					<div className='flex items-center justify-end gap-2'>
						<DialogClose asChild>
							<Button variant='ghost'>Cancel</Button>
						</DialogClose>
						<Button
							disabled={!selectedUser}
							type='submit'
						>
							Create
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
