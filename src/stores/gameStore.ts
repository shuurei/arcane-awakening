import { create } from 'zustand'

import { resolveTurn, type BattleWinner, type Entity } from '@/game/engine'
import { Entitys, player } from '@/data/entities'

export interface BattleState {
    player: Entity | null;
    enemy: Entity | null;
    log: string[];
    winner: BattleWinner;
    busy: boolean;
    winCount: number;
    looseCount: number;
    initBattle: () => void;
    incrementWin: () => void;
    incrementLoose: () => void;
    attack: (skillId: string) => Promise<void>;
    reset: () => void;
}

export const useBattleStore = create<BattleState>((set, get) => ({
    player: null,
    enemy: null,
    log: [],
    winner: null,
    busy: false,
    winCount: 0,
    looseCount: 0,
    incrementWin: () => set((s) => ({ winCount: s.winCount + 1 })),
    incrementLoose: () => set((s) => ({ looseCount: s.looseCount + 1 })),
    initBattle: () => {
        set({
            player: { ...player },
            enemy: { ...Entitys[Math.floor(Math.random() * Entitys.length)] },
            log: [ 'Battle started!' ],
            winner: null,
        })
    },
    attack: async (skillId) => {
        const state = get()
        if (state.busy || state.winner) return

        set({ busy: true })

        await new Promise(r => setTimeout(r, 400))

        const newState = resolveTurn(
            {
                player: state.player,
                enemy: state.enemy,
            },
            skillId
        )

        if (!newState) return;

        if (newState?.winner === 'player') {
            state.incrementWin();
        } else if (newState?.winner === 'enemy') {
            state.incrementLoose();
        }

        set({
            player: newState.player,
            enemy: newState.enemy,
            log: [...state.log, ...newState.log],
            winner: newState.winner as 'player' | 'enemy',
            busy: false,
        })
    },

    reset: () =>
        set({
            player: null,
            enemy: null,
            log: [],
            winner: null,
            busy: false,
        }),
}))

