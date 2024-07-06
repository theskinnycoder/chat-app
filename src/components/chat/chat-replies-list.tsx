import type { Reply } from '@/types'
import ChatReplyMessage from './chat-reply-message'
import { useState } from 'react'
import { Button } from '../ui/button'

interface ChatRepliesListProps {
	replies: Reply[]
}

export default function ChatRepliesList({ replies }: ChatRepliesListProps) {
	const [hideReplies, setHideReplies] = useState(true)

	return (
		<>
			{!hideReplies && replies.length > 0 && (
				<>
					<Button
						size='sm'
						variant='ghost'
						onClick={() => setHideReplies(true)}
					>
						Hide replies
					</Button>

					{replies.map(reply => (
						<ChatReplyMessage
							key={reply.id}
							reply={reply}
						/>
					))}
				</>
			)}

			{hideReplies && replies.length > 0 && (
				<Button
					size='sm'
					variant='ghost'
					onClick={() => setHideReplies(false)}
				>
					{replies.length} replies
				</Button>
			)}
		</>
	)
}
