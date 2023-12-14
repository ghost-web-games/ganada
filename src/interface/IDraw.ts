
export interface IDraw {
    resize(width: number, height: number): void
    update(): void
    draw(ctx: CanvasRenderingContext2D | null, magnification: number): void
}