import Vector from "../libs/vector"

export default class AssetLoader { 
    img: HTMLImageElement
    gridPx: number
    rightPos: Vector
    leftPos: Vector

    constructor(id: string, gridPx: number) {
        this.img = document.querySelector(id) as HTMLImageElement
        this.gridPx = gridPx

        this.leftPos = new Vector(0, 0)
        this.rightPos = new Vector(this.img.width - 4, 0)
    }

    set Pos(pos: Vector) {
        this.leftPos = pos
    }

    public draw(ctx: CanvasRenderingContext2D | null) {
        if (ctx == null) return
        ctx.drawImage(
            this.img,
            this.leftPos.x, this.leftPos.y, 
            this.img.width, this.img.height
        )
    }
}