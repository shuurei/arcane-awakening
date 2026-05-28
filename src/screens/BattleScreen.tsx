import { useBattleStore } from '@/stores/gameStore'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function BattleScreen() {
    const {
        initBattle,
        player: p,
        enemy: e,
        attack,
        log,
        winner,
        busy,
        winCount,
        looseCount
    } = useBattleStore();

    const handleInitGame = () => initBattle();

    useEffect(() => handleInitGame(), []);

    if (!(e && p)) return null;

    return (
        <div className='h-full bg-linear-to-b from-zinc-950 to-zinc-900 flex flex-col'>
            {/* Back */}
            <Link
                to='/'
                className='w-fit px-4 py-2 font-semibold cursor-pointer'
            >Retour</Link>

            {/* ENEMY */}
            <div className='flex-1 flex flex-col items-center justify-center'>
                <div className='flex gap-2 text-xl mb-2'>
                    <span>{e.name}</span>
                    <img width={24} height={24} src={`/arcane-awakening/assets/elements/${e.type}.png`} />
                </div>

                <div className='w-64 h-2 bg-zinc-700 -skew-x-24'>
                    <div
                        className='h-full bg-red-500 transition-all -skew-x-24'
                        style={{ width: `${(e.hp / e.maxHp) * 100}%` }}
                    />
                </div>

                <div className='text-sm mt-1'>{e.hp} HP</div>
            </div>

            {/* LOG */}
            <div className='h-24 overflow-auto text-xs opacity-80 px-4'>
                <p>WINS : {winCount}</p>
                <p>LOOSES : {looseCount}</p>
                {log.slice(-4).map((l, i) => (
                    <div key={i}>› {l}</div>
                ))}
            </div>

            {/* PLAYER */}
            <div className='flex-1 flex flex-col items-center justify-center'>
                <div className='w-64 h-2 bg-zinc-700 -skew-x-24'>
                    <div
                        className='h-full bg-green-500 transition-all -skew-x-24'
                        style={{ width: `${(p.hp / p.maxHp) * 100}%` }}
                    />
                </div>

                <div className='text-sm mt-1'>{p.hp} HP</div>
            </div>

            {/* ACTIONS */}
            <div className='p-4 grid grid-cols-2 gap-2 bg-black/40 backdrop-blur'>
                {p.skills.map(skill => (
                    <button
                        key={skill.id}
                        disabled={busy}
                        onClick={() => attack(skill.id)}
                        className='flex justify-center items-center  gap-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-3 transition disabled:opacity-30'
                    >
                        <span>{skill.name}</span>
                        <img width={24} height={24} src={`/arcane-awakening/assets/elements/${skill.type}.png`} />
                    </button>
                ))}
            </div>

            {/* WINNER */}
            {winner && (
                <div className='absolute inset-0 flex items-center justify-center text-4xl font-bold bg-black/70' onClick={handleInitGame}>
                    {winner === 'player' ? 'YOU WIN' : 'YOU LOSE'}
                </div>
            )}
        </div>
    )
}