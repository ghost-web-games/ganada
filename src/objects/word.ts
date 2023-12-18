import { IMover } from "../contoller/usercontoller";
import IDraw from "../interface/IDraw";
import * as pxutil from "../libs/pixelutil"
import Vector from "../libs/vector";
import { ObjConfig } from "../models/objconfig";
import { BoundingBox, IBox } from "./boundingbox";


export default class Word implements IDraw, IMover, IBox {
    pixel: number
    mag: number
    playerCoord: Vector
    word: string
    width: number
    height: number
    wordsLoc: Vector
    color: string
    box: BoundingBox

    constructor(config: ObjConfig, color: string, word: string) {
        this.mag = config.mag
        this.pixel = config.pixel
        this.playerCoord = new Vector(0, 0)
        this.height = pxutil.pixelFitUp(config.height, this.viewpixel)
        this.width = pxutil.pixelFitUp(config.width, this.viewpixel)

        this.word = word
        const x = Math.floor(this.width * Math.random())
        const y = Math.floor(this.height * Math.random())
        this.wordsLoc = new Vector(x, y)
        this.color = color
        this.box = new BoundingBox(this)
    }
    get BBox(): BoundingBox { return this.box }
    get Str(): string { return this.word }

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
        this.height = pxutil.pixelFitUp(height, this.viewpixel)
        this.width = pxutil.pixelFitUp(width, this.viewpixel)

        const x = pxutil.pixelFitUp(Math.floor(this.width * Math.random()), this.viewpixel)
        const y = pxutil.pixelFitUp(Math.floor(this.height * Math.random()), this.viewpixel)
        this.wordsLoc.setXY(x, y)
    }

    get viewpixel(): number {
        return this.pixel * this.mag
    }
    get X(): number { return (this.wordsLoc.x + this.playerCoord.x) % this.width }
    get Y(): number { return (this.wordsLoc.y + this.playerCoord.y + this.viewpixel / 2) % this.height}
    get Width(): number { return this.viewpixel}
    get Height(): number { return this.viewpixel}

    public update() {
    }
    public checkOutrange(): boolean { return false }

    public draw(ctx: CanvasRenderingContext2D | null, magnifiaction: number) {
        if (ctx == null) return
        if (this.mag != magnifiaction) {
            this.mag = magnifiaction
        }
 
        ctx.font = `bold ${this.viewpixel * 2}px 'Cute Font'`
        ctx.textBaseline = "top"
        const movingX = (this.wordsLoc.x + this.playerCoord.x) % this.width
        const movingY = (this.wordsLoc.y + this.playerCoord.y) % this.height
        ctx.fillStyle = this.color
        ctx.fillText(this.word, movingX, movingY)
    }
}