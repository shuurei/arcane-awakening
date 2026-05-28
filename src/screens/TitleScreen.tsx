import { useNavigate } from 'react-router-dom'

import { useBattleStore } from '@/stores/gameStore'
import { Button } from '@/components/Button'

export default function TitleScreen() {
	const navigate = useNavigate();
	const initBattle = useBattleStore((s) => s.initBattle);

	const startGame = () => {
		initBattle();
		navigate('/battle');
	}

	return (
		<div className='relative h-screen w-full flex flex-col items-center justify-center'>
			<div className='absolute h-1/2 aspect-square bg-purple-600/15 blur-[120px] animate-pulse' />

			<div className='relative z-10 flex flex-col items-center'>
				<h1 className={`font-black text-center transition-all duration-700 text-3xl md:text-6xl sm:text-5xl`}>
					ARCANE AWAKENING
				</h1>

				<p className={`text-white/50 transition-all duration-700 text-sm md:text-lg`}>
					A turn-based combat prototype by 0x27
				</p>

				<Button className='mt-3' onClick={startGame}>START</Button>
			</div>
		</div>
	)
}