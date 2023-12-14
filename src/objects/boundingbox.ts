import { IDraw } from "../interface/IDraw";

export interface IBox {
    get X(): number
    get Y(): number
    get Width(): number
    get Height(): number
}

export class BoundingBox implements IDraw {
    box: IBox

    constructor(box: IBox) {
        this.box = box
    }

    isColliding(target: IBox) {
        return (
            target.X + target.Width >= this.box.X &&
            target.X <= this.box.X + this.box.Width &&
            target.Y + target.Height >= this.box.Y &&
            target.Y <= this.box.Y + this.box.Height
        )
    }

    public update() { }

    public resize(width: number, height: number) { }
    
    public draw(ctx: CanvasRenderingContext2D | null, magnifiaction: number) {
        if (ctx == null) return
        /*
        ctx.fillStyle = `rgba(255, 0, 0, 0.3)`
        ctx.fillRect(this.box.X, this.box.Y, this.box.Width, this.box.Height)
        */
    }
}