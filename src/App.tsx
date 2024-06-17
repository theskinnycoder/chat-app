import ChatLayout from '@/components/chat/chat-layout'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'

function App() {
	return (
		<TooltipProvider>
			<Toaster />
			<main className='flex h-dvh flex-col items-center justify-center gap-4 p-4 py-32 md:px-24'>
				<div className='z-10 h-full w-full max-w-5xl rounded-lg border text-sm lg:flex'>
					<ChatLayout navCollapsedSize={8} />
				</div>
			</main>
		</TooltipProvider>
	)
}

export default App
