import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Chat from './chat'
import ChatSidebar from './dm/chat-sidebar'

interface ChatLayoutProps {
	defaultCollapsed?: boolean
	navCollapsedSize: number
}

export default function ChatLayout({
	defaultCollapsed = false,
	navCollapsedSize,
}: ChatLayoutProps) {
	const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkScreenWidth = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		// Initial check
		checkScreenWidth()

		// Event listener for screen width changes
		window.addEventListener('resize', checkScreenWidth)

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener('resize', checkScreenWidth)
		}
	}, [])

	return (
		<ResizablePanelGroup
			direction='horizontal'
			onLayout={(sizes: number[]) => {
				document.cookie = `react-resizable-panels:layout=${JSON.stringify(
					sizes,
				)}`
			}}
			className='h-full items-stretch'
		>
			{/* Sidebar */}
			<ResizablePanel
				defaultSize={320}
				collapsedSize={navCollapsedSize}
				collapsible={true}
				minSize={isMobile ? 0 : 24}
				maxSize={isMobile ? 8 : 30}
				onCollapse={() => {
					setIsCollapsed(true)
					document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
						true,
					)}`
				}}
				onExpand={() => {
					setIsCollapsed(false)
					document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
						false,
					)}`
				}}
				className={cn(
					isCollapsed &&
						'min-w-[50px] transition-all duration-300 ease-in-out md:min-w-[70px]',
				)}
			>
				<ChatSidebar
					isCollapsed={isCollapsed || isMobile}
					isMobile={isMobile}
				/>
			</ResizablePanel>

			<ResizableHandle withHandle />

			{/* Chat Widget */}
			<ResizablePanel
				defaultSize={480}
				minSize={30}
			>
				<Chat isMobile={isMobile} />
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
