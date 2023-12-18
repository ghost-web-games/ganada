
export default interface IDraw {
    checkOutrange(): boolean
    resize(width: number, height: number): void
    update(): void
    draw(ctx: CanvasRenderingContext2D | null, magnification: number): void
}