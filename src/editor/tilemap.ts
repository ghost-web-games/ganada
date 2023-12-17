import IDraw from "../interface/IDraw"
import Vector from "../libs/vector"
import { IMouseEvent } from "../mouse"

type ChoiceRange = {
    start: Vector
    width: number
    height: number
}

export default class TileMap implements IMouseEvent, IDraw {
    img: HTMLImageElement
    width: number
    height: number
    gridpx: number
    cursor: Vector
    leftPos: Vector
    choiceEntry: Vector
    choiceFlag: boolean
    choiceRange: ChoiceRange
    dragFlag: boolean
    mag: number

    constructor(width: number, height: number, gridpx: number, id: string) {
        this.img = document.querySelector(id) as HTMLImageElement
        this.width = width
        this.height = height
        this.gridpx = gridpx
        this.cursor = new Vector(-1000, -1000)
        this.leftPos = new Vector(-1000, -1000)
        this.choiceEntry = new Vector(-1000, -1000)
        this.choiceFlag = false
        this.choiceRange = {start: new Vector(-1000, -1000), width: 0, height: 0}
        this.dragFlag = false
        this.mag = 1

        this.updatePos()
    }

    OverEvent(x: number, y: number): void {
        this.cursor.setXY(x, y)
        if (this.dragFlag == true) {
            this.choiceRange.width = x - this.choiceRange.start.x
            this.choiceRange.height = y - this.choiceRange.start.y
        }
    }

    ClickUpEvent(x: number, y: number): void { 
        if (this.dragFlag == true) {
            if (x > this.leftPos.x && x < this.leftPos.x + this.img.width * this.mag &&
                y > this.leftPos.y && y < this.leftPos.y + this.img.height * this.mag) {
                this.choiceMap((this.choiceRange.start.x - this.leftPos.x) / this.mag, 
                    (this.choiceRange.start.y - this.leftPos.y) / this.mag,
                    (x - this.choiceRange.start.x) / this.mag, 
                    (y - this.choiceRange.start.y) / this.mag
                )
            }
            this.dragFlag = false
        }
    }

    ClickEvent(x: number, y: number): void {
        if (x > this.leftPos.x && x < this.leftPos.x + this.img.width * this.mag &&
            y > this.leftPos.y && y < this.leftPos.y + this.img.height * this.mag) {
            this.choiceRange.start.setXY(x, y)
            this.dragFlag = true
        } else {
            this.releaseMap(x, y)
        }
    }
    releaseMap(x: number, y: number): void {
        if (this.choiceFlag == true) {
            this.choiceFlag = false
        }
    }
    choiceMap(x: number, y: number, width: number, height: number): void {
        if (this.choiceFlag == false) {
            this.choiceEntry.setXY(x, y)
            this.choiceRange.start.setXY(x, y)
            this.choiceRange.width = width
            this.choiceRange.height = height
            this.choiceFlag = true
        }
    }
    updatePos() {
        const _x = (this.width - this.img.width * this.mag) / 2
        const x = this.pixelFitDown(_x, (this.gridpx * this.mag))
        const _y = (this.height - this.img.height * this.mag)
        const y =  this.pixelFitDown(_y, (this.gridpx * this.mag)) - this.gridpx * this.mag * 2
        this.leftPos.setXY(x, y)
        //console.log(this.leftPos, ", ", this.mag)
    }

    public resize(width: number, height: number) {
        this.width = width
        this.height = height
        this.updatePos()
    }
    public update() { }

    public draw(ctx: CanvasRenderingContext2D | null, magnifiaction: number) {
        if (ctx == null) return
        if (this.mag != magnifiaction) {
            this.mag = magnifiaction
            this.updatePos()
        }

        ctx.drawImage(
            this.img,
            this.leftPos.x, this.leftPos.y, 
            this.img.width * this.mag, this.img.height * this.mag
        )
        if (this.dragFlag == true) {
            ctx.fillStyle = 'rgba(200,200,200,0.5)'
            ctx.fillRect(this.choiceRange.start.x, this.choiceRange.start.y, 
                this.choiceRange.width, this.choiceRange.height)

        }
        if (this.choiceFlag == true) {
            const sx = this.pixelFitDown(this.choiceRange.start.x, this.gridpx)
            const sy = this.pixelFitDown(this.choiceRange.start.y, this.gridpx)
            const swidth = this.pixelFitUp(this.choiceRange.width, this.gridpx)
            const sheight = this.pixelFitUp(this.choiceRange.height, this.gridpx)
            const x = this.pixelFitDown(this.cursor.x, (this.gridpx * this.mag))
            const y = this.pixelFitDown(this.cursor.y, (this.gridpx * this.mag))
            ctx.drawImage(
                this.img,
                sx, sy, this.gridpx, this.gridpx,
                x, y, this.gridpx * this.mag, this.gridpx * this.mag)
        }
    }
    pixelFitDown(x: number, pixel: number): number {
        return x - x % pixel
    }
    pixelFitUp(x: number, pixel: number): number {
        const mod = x % pixel
        return (mod > 0)? x + pixel - mod: mod
    }

}