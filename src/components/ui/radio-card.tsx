import type { PropsWithChildren } from 'react'
import { Label } from './label'
import { RadioGroupItem } from './radio-group'

interface RadioCardProps extends PropsWithChildren {
	value: string
}

export default function RadioCard({ value, children }: RadioCardProps) {
	return (
		<div>
			<RadioGroupItem
				value={value}
				id={value}
				className='peer sr-only'
			/>
			<Label
				htmlFor={value}
				className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted/40 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
			>
				{children}
			</Label>
		</div>
	)
}
