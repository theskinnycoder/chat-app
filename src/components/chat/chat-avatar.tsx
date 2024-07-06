import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { User } from '@/types'
import React from 'react'

interface ChatAvatarProps {
	user: User
}

const ChatAvatar = React.memo<ChatAvatarProps>(({ user }) => {
	return (
		<Avatar className='flex items-center justify-center'>
			<AvatarImage
				src={user.avatar}
				alt={user.name}
				width={6}
				height={6}
				className='size-10 '
			/>
			<AvatarFallback className='text-black dark:text-white'>
				{user.name[0]}
			</AvatarFallback>
		</Avatar>
	)
})

export default ChatAvatar
