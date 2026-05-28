import Sprite from './Sprite'

interface PlayerSpriteProps {
    animationType: 'idle' | 'walk' | 'run';
    animationDirection: 'down' | 'left' | 'right' | 'up'
    scale?: number;
}

const playerSpritesPath = '/assets/player' as const;

const generateAnimation = (name: string, length: number) => {
    return {
        down: Array.from({ length }, (_, i) =>
            `${playerSpritesPath}/${name}/down/${i + 1}.png`
        ),
        right: Array.from({ length }, (_, i) =>
            `${playerSpritesPath}/${name}/right/${i + 1}.png`
        ),
        left: Array.from({ length }, (_, i) =>
            `${playerSpritesPath}/${name}/left/${i + 1}.png`
        ),
        up: Array.from({ length }, (_, i) =>
            `${playerSpritesPath}/${name}/up/${i + 1}.png`
        ),
    }
}

const animations = {
    idle: generateAnimation('idle', 2),
    run: generateAnimation('run', 8),
    walk: generateAnimation('walk', 9),
} as const;

export default function PlayerSprite({
    animationType,
    animationDirection,
    scale = 1
}: PlayerSpriteProps) {
    return (
        <Sprite
            width={64 * scale}
            height={64 * scale}
            src={animations[animationType][animationDirection]}
        />
    );
}