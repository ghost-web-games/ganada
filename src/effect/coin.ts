import { IMover } from "../contoller/usercontoller";
import IDraw from "../interface/IDraw";
import Vector from "../libs/vector";
import { ImgObjConfig } from "../models/objconfig";


export default class Coin implements IDraw, IMover {
    img: HTMLImageElement
    pixel: number
    imagePixel: number
    mag: number
    width: number
    height: number
    imgseq: number
    frame: number

    tileVec: Array<Vector>
    pos: Vector
    playerCoord: Vector

    angle: number
    friction: number
    gravity: number
    vx: number
    vy: number

    constructor(config: ImgObjConfig) {
        this.img = config.img
        this.mag = config.mag
        this.width = config.width
        this.height = config.height
        this.pixel = config.pixel
        this.imagePixel = config.imagePixel
        this.frame = this.imgseq = 0
        this.tileVec = this.selectTile(config.tiles)
        this.playerCoord = new Vector(0, 0)
        this.pos = new Vector((config.width - this.viewpixel) / 2,
            (config.height - this.viewpixel) / 2)

        this.angle = Math.PI / 180 * 45
        this.friction = 1
        this.gravity = 0.93
        this.vx = -5
        this.vy = -10
    }
    public selectTile(offsets: number[]): Array<Vector> {
        const ret = new Array<Vector>()
        offsets.forEach((offset) => {
            const x = offset % (this.img.width / this.imagePixel) * this.imagePixel
            const y = Math.floor(offset / (this.img.width / this.imagePixel)) * this.imagePixel
            const v = new Vector(x, y)
            ret.push(v)
        })
        return ret
    }
    get viewpixel(): number {
        return this.pixel * this.mag
    }
    InitCoord(playerCoord: Vector): void {
        this.playerCoord = playerCoord
    }
    Moving(playerCoord: Vector): void {
        this.playerCoord = playerCoord
    }
    MoveStart(playerCoord: Vector): void {
        this.playerCoord = playerCoord
    }
    MoveEnd(playerCoord: Vector): void {
        this.playerCoord = playerCoord
    }
    public resize(width: number, height: number) {
        this.width = width
        this.height = height
        this.pos = new Vector((this.width - this.viewpixel) / 2,
            (this.height - this.viewpixel) / 2)
    }

    public update() {
        if (++this.frame % 1 === 0) {
            this.imgseq = ++this.imgseq % this.tileVec.length
        }
        this.vy += this.gravity
        this.vx = this.vx * this.friction
        this.vy = this.vy * this.friction

        this.pos.x += this.vx
        this.pos.y += this.vy
    }
    public checkOutrange(): boolean {
        if (this.pos.x > this.width || this.pos.y > this.height) {
            return true
        }
        return false 
    }

    public draw(ctx: CanvasRenderingContext2D | null, magnifiaction: number) {
        if (ctx == null) return
        if (this.mag != magnifiaction) {
            this.mag = magnifiaction
        }
        const pos = this.tileVec[this.imgseq]

        const movingX = this.pos.x
        const movingY = this.pos.y 
        ctx.drawImage(this.img,
            pos.x, pos.y, this.imagePixel, this.imagePixel,
            movingX, movingY, this.viewpixel, this.viewpixel)
    }
}