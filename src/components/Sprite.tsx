import { useEffect, useRef } from 'react'

interface SpriteProps {
    src: string | string[]
    width?: number
    height?: number
    msPerFrame?: number
    running?: boolean
    style?: React.CSSProperties
    className?: string
}

const cache = new Map<string, HTMLImageElement>();

const loadImage = (src: string) => {
    if (cache.has(src)) {
        return cache.get(src)!;
    }

    const img = new Image();
    img.src = src;
    cache.set(src, img);

    return img;
}

export default function Sprite({ src, width = 64, height = 64, style, className }: SpriteProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const spritesRef = useRef<HTMLImageElement[]>([]);
    const frameIdRef = useRef(0);

    const animationFrameIdRef = useRef<number | null>(null);
    const lastFrameUpdateAtRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        const sprites = Array.isArray(src) ? src : [src];
        spritesRef.current = sprites.map(loadImage);

        if (!(canvas && ctx) || sprites.length < 0) return;

        const draw = () => {
            const img = spritesRef.current[frameIdRef.current];
            if (img.complete) {
                ctx.clearRect(0, 0, width, height);
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(img, 0, 0, width, height);
            }
        }

        draw();

        if (sprites.length > 1) {
            const animate = (ts: number) => {
                const spritesCount = spritesRef.current.length;
            
                if (ts - lastFrameUpdateAtRef.current >= (1000 / spritesCount)) {
                    frameIdRef.current = (frameIdRef.current + 1) % spritesCount;
                    lastFrameUpdateAtRef.current = ts;
                    draw();
                }

                animationFrameIdRef.current = requestAnimationFrame(animate);
            }

            animationFrameIdRef.current = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animationFrameIdRef.current!);
        } else {
            spritesRef.current[frameIdRef.current].addEventListener('load', () => draw(), { once: true });
        }
    }, [src, height, width]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{ ...style, imageRendering: 'pixelated' }}
            className={className}
        />
    );
}