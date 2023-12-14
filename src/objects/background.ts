import Vector from "../libs/vector"
import * as pxutil from "../libs/pixelutil"
import { IDraw } from "../interface/IDraw"
import { ImgObjConfig } from "../models/objconfig"
import { IMover } from "../contoller/usercontoller"



export class Background implements IDraw, IMover{
    img: HTMLImageElement
    pixel: number
    width: number
    height: number
    mag: number
    rightPos: Vector
    leftPos: Vector
    tileVec: Array<Vector>
    map: Array<Vector>
    playerCoord: Vector
    movingFlag: boolean
    centerPos: Vector

    constructor(config: ImgObjConfig) {
        this.img = config.img
        this.pixel = config.pixel
        this.mag = config.mag
        this.height = pxutil.pixelFitUp(config.height, config.pixel)
        this.width = pxutil.pixelFitUp(config.width, config.pixel)
        this.leftPos = new Vector(0, 0)
        this.rightPos = new Vector(this.width - 4, 0)
        this.playerCoord = new Vector(0, 0)
        this.tileVec = new Array<Vector>()
        this.map = new Array<Vector>()
        this.movingFlag = false
        this.centerPos = new Vector((config.width - this.viewpixel) / 2,
            (config.height - this.viewpixel) / 2)
        this.selectTile(config.tiles)
    }

    public selectTile(offsets: number[]) {
        offsets.forEach((offset) => {
            const x = offset % (this.img.width / this.pixel) * this.pixel
            const y = Math.floor(offset / (this.img.width / this.pixel)) * this.pixel
            const v = new Vector(x, y)
            this.tileVec.push(v)
        })
        this.fillBackground()
    }
    get viewpixel() : number {
        return this.pixel * this.mag
    }
    fillBackground(){
        const x_tile = Math.floor(this.width / this.viewpixel)
        const y_tile = Math.floor(this.height / this.viewpixel)

        for (let i = 0; i < x_tile * y_tile; i++) {
            const tileRdIdx = Math.floor(Math.random() * this.tileVec.length)
            const tile = this.tileVec[tileRdIdx]
            this.map.push(tile)
        }
    }
    InitCoord(playerCoord: Vector): void {
        this.playerCoord = playerCoord
    }
    Moving(playerCoord: Vector): void {
        this.playerCoord = playerCoord
    }
    MoveStart(playerCoord: Vector): void {
        this.playerCoord = playerCoord
        this.movingFlag = true
    }
    MoveEnd(playerCoord: Vector): void {
        this.movingFlag = false
    }

    public update() {

    }

    public resize(width: number, height: number) {
        this.width = width
        this.height = height
        this.centerPos = new Vector((width - this.viewpixel) / 2,
            (height - this.viewpixel) / 2)
        this.fillBackground()
    }

    public draw(ctx: CanvasRenderingContext2D | null, magnifiaction: number) {
        if (ctx == null) return
        if (this.mag != magnifiaction) {
            this.mag = magnifiaction
            this.fillBackground()
        }
        const widthMax = pxutil.pixelFitUp(this.width, this.viewpixel)
        const heightMax = pxutil.pixelFitUp(this.height, this.viewpixel)
        const x_tile = Math.floor(widthMax / this.viewpixel)
        const y_tile = Math.floor(heightMax / this.viewpixel)

        for (let i = 0; i < x_tile * y_tile; i++) {
            const x = (i % x_tile) * this.viewpixel
            const y = Math.floor(i / x_tile) * this.viewpixel
            const movingX = (x + this.playerCoord.x) % widthMax
            const movingY = (y + this.playerCoord.y) % heightMax
            const tile = this.map[i]
            ctx.drawImage(
                this.img,
                tile.x, tile.y, this.pixel, this.pixel,
                movingX, movingY, this.viewpixel, this.viewpixel
            )
        }
    }
}