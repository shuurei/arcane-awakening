import type { BattleState } from '@/stores/gameStore'

export type Type = 'fire' | 'water' | 'earth' | 'ice';

export type Skill = {
    id: string
    name: string
    power: number
    type: Type
}

export type Entity = {
    id: string
    name: string
    type: Type
    hp: number
    maxHp: number
    attack: number
    defense: number
    speed: number
    sprite: string
    skills: Skill[]
}

export type BattleWinner = | 'player' | 'enemy' | null

export const advantage: Record<Type, Type[]> = {
    earth: ['water', 'fire'],
    fire:  ['ice'],
    water: ['fire'],
    ice:   ['fire'],
}

export function getMultiplier(att: Type, def: Type) {
    if (advantage[att]?.includes(def)) return 2
    if (advantage[def]?.includes(att)) return 0.5
    return 1
}

export function calcDamage(attacker: Entity, defender: Entity, skill: Skill) {
    const base = attacker.attack + skill.power - defender.defense

    const mult = getMultiplier(skill.type, defender.type)

    return Math.max(1, Math.floor(base * mult))
}

export function resolveTurn(state: Pick<BattleState, 'player' | 'enemy'> & Partial<BattleState>, skillId: string) {
    if (state.player && state.enemy) {
        const playerSkill = state.player.skills.find((s) => s.id === skillId);

        const log = []

        const dmg1 = calcDamage(state.player, state.enemy, playerSkill!)
        state.enemy.hp -= dmg1
        log.push(`${state.player.name} uses ${playerSkill!.name}! -${dmg1}`)

        if (state.enemy.hp <= 0) {
            state.enemy.hp = 0
            return { ...state, log, winner: 'player' }
        }

        const enemySkill = state.enemy.skills[Math.floor(Math.random() * state.enemy.skills.length)];

        const dmg2 = calcDamage(state.enemy, state.player, enemySkill)
        state.player.hp -= dmg2
        log.push(`${state.enemy.name} uses ${enemySkill.name}! -${dmg2}`)

        if (state.player.hp <= 0) {
            state.player.hp = 0
            return { ...state, log, winner: 'enemy' }
        }

        return { ...state, log }
    }
}