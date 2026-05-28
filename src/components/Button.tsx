import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'ghost'
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={cn(
                'px-10 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer',
                variant === 'primary' && 'bg-linear-to-r from-purple-600 to-fuchsia-600 shadow-lg shadow-purple-600/40',
                variant === 'ghost' && 'border border-white/20 text-white/70 hover:text-white hover:border-white/50',
                className,
            )}
        >
            {children}
        </button>
    )
}