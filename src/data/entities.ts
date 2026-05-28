import type { Entity } from '@/game/engine'

export const player = {
    id: 'player',
    name: 'Player',
    type: 'fire',
    hp: 100,
    maxHp: 100,
    attack: 20,
    defense: 10,
    speed: 7,
    sprite: '',
    skills: [
        { id: 'kombucha', name: 'KOMBUCHAAAA', power: 75, type: 'water' },
        { id: 'fireball', name: 'Fireball', power: 25, type: 'fire' },
        { id: 'slash', name: 'Slash', power: 15, type: 'earth' },
    ],
} satisfies Entity

export const goblin = {
    id: 'goblin',
    name: 'Goblin',
    type: 'earth',
    hp: 90,
    maxHp: 90,
    attack: 18,
    defense: 8,
    speed: 8,
    sprite: '',
    skills: [
        { id: 'bite', name: 'Bite', power: 20, type: 'earth' },
        { id: 'hit', name: 'Hit', power: 10, type: 'earth' },
    ],
} satisfies Entity

export const zombie = {
    id: 'zombie',
    name: 'Zombie',
    type: 'earth',
    hp: 120,
    maxHp: 120,
    attack: 22,
    defense: 12,
    speed: 4,
    sprite: '',
    skills: [
        { id: 'bite', name: 'Bite', power: 20, type: 'earth' },
        { id: 'hit', name: 'Hit', power: 10, type: 'earth' },
    ],
} satisfies Entity

export const salamandre = {
    id: 'salamandre',
    name: 'Salamandre',
    type: 'fire',
    hp: 80,
    maxHp: 80,
    attack: 15,
    defense: 8,
    speed: 12,
    sprite: '',
    skills: [
        { id: 'bite', name: 'Bite', power: 20, type: 'earth' },
        { id: 'hit', name: 'Hit', power: 10, type: 'earth' },
    ],
} satisfies Entity

export const slime = {
    id: 'slime',
    name: 'Slime',
    type: 'water',
    hp: 20,
    maxHp: 20,
    attack: 2,
    defense: 1,
    speed: 1,
    sprite: '',
    skills: [
        { id: 'bite', name: 'Bite', power: 20, type: 'earth' },
        { id: 'hit', name: 'Hit', power: 10, type: 'earth' },
    ],
} satisfies Entity

export const forstSlime = {
    id: 'forstSlime',
    name: 'Slime de froid',
    type: 'ice',
    hp: 40,
    maxHp: 40,
    attack: 10,
    defense: 20,
    speed: 2,
    sprite: '',
    skills: [
        { id: 'bite', name: 'Bite', power: 20, type: 'earth' },
        { id: 'hit', name: 'Hit', power: 10, type: 'earth' },
    ],
} satisfies Entity

export const Entitys = [
    goblin,
    zombie,
    salamandre,
    slime,
    forstSlime
] as const;