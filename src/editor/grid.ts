import IDraw from "../interface/IDraw";
import Vector from "../libs/vector"
import { IMouseEvent } from "../mouse"


export default class Grid implements IMouseEvent, IDraw {
    width: number
    height: number
    gridpx: number
    cursor: Vector
    mag: number

    constructor(width: number, height: number, gridpx: number){
        this.width = width
        this.height = height
        this.gridpx = gridpx
        this.cursor = new Vector(-1000, -1000)
        this.mag = 0
    }

    OverEvent(x: number, y: number): void {
        this.cursor.setXY(x, y)
    }

    ClickUpEvent(x: number, y: number): void { }

    ClickEvent(x: number, y: number): void {
        this.cursor.setXY(x, y)
    }

    public resize(width: number, height: number) {
        this.width = width
        this.height = height
    }

    public update() { }
    public checkOutrange(): boolean { return false }

    public draw(ctx: CanvasRenderingContext2D | null, magnification: number) {
        if (ctx == null) return
        this.mag = magnification

        ctx.clearRect(0, 0, this.width, this.height);
        ctx.beginPath();

        for(let i = 0; i < this.width; i += this.gridpx * this.mag) {
            ctx.beginPath()
            ctx.moveTo(i, 0)
            ctx.lineTo(i, this.height)
            ctx.strokeStyle = 'silver'
            ctx.stroke()
        }
        for(let i = 0; i < this.height; i += this.gridpx * this.mag) {
            ctx.beginPath()
            ctx.moveTo(0, i)
            ctx.lineTo(this.width, i)
            ctx.strokeStyle = 'silver'
            ctx.stroke()
        }

        const x = this.cursor.x - this.cursor.x % (this.gridpx * this.mag)
        const y = this.cursor.y - this.cursor.y % (this.gridpx * this.mag)
        if (x > 0 && x < this.width && y > 0 && y < this.height) {
            ctx.fillStyle = 'pink'
            ctx.fillRect(x, y, this.gridpx * this.mag, this.gridpx * this.mag)
        }
    }
}