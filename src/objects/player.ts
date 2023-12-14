import { IDraw } from "../interface/IDraw"
import Vector from "../libs/vector"
import { ImgObjConfig } from "../models/objconfig"
import { IMoveState, MoveState } from "./movestate"
import { getAngle } from "../libs/utils"
import { Direction, IMover } from "../contoller/usercontoller"
import { BoundingBox, IBox } from "./boundingbox"

export default class Player implements IDraw, IMover, IBox {
    leftStat: IMoveState
    rightStat: IMoveState
    upStat: IMoveState
    downStat: IMoveState
    curStat: IMoveState
    stateList: IMoveState[]

    pixel: number
    mag: number
    centerPos: Vector
    playerCoord: Vector
    playerBox: BoundingBox

    constructor(config: ImgObjConfig) {
        this.mag = config.mag
        this.pixel = config.pixel
        this.centerPos = new Vector((config.width - this.viewpixel) / 2,
            (config.height - this.viewpixel) / 2)
        this.playerCoord = new Vector(0, 0)
        config.idleTiles = [85, 88]
        config.tiles = [91, 94]
        this.leftStat = new MoveState(config)
        config.idleTiles = [49, 52]
        config.tiles = [55, 58]
        this.upStat = new MoveState(config)
        config.idleTiles = [13, 16]
        config.tiles = [19, 22]
        this.downStat = new MoveState(config)
        config.idleTiles = [121, 124]
        config.tiles = [127, 130]
        this.rightStat = new MoveState(config)

        this.stateList = []
        this.stateList[Direction.Up] = this.upStat
        this.stateList[Direction.Left] = this.leftStat
        this.stateList[Direction.Down] = this.downStat
        this.stateList[Direction.Right] = this.rightStat
        this.curStat = this.downStat

        this.playerBox = new BoundingBox(this)
    }
    get viewpixel(): number {
        return this.pixel * this.mag
    }
    InitCoord(playerCoord: Vector, dir: Direction): void {
        this.curStat = this.stateList[dir]
        this.playerCoord = playerCoord
    }
    Moving(playerCoord: Vector): void {
        this.playerCoord = playerCoord
    }
    MoveStart(playerCoord: Vector, dir: Direction): void {
        this.curStat.Moving = true
        this.curStat = this.stateList[dir]
        this.playerCoord = playerCoord
    }
    MoveEnd(playerCoord: Vector): void {
        this.curStat.Moving = false
        this.playerCoord = playerCoord
    }
    get X(): number { return this.centerPos.x}
    get Y(): number { return this.centerPos.y}
    get Width(): number { return this.viewpixel}
    get Height(): number { return this.viewpixel}

    public resize(width: number, height: number) {
        this.centerPos = new Vector((width - this.viewpixel) / 2,
            (height - this.viewpixel) / 2)
        this.stateList.forEach((state) => {
            state.resize(width, height)
        })
    }

    public update() {
        this.curStat.update()
    }

    public draw(ctx: CanvasRenderingContext2D | null, magnifiaction: number) {
        if (ctx == null) return
        if (this.mag != magnifiaction) {
            this.mag = magnifiaction
        }
        this.curStat.draw(ctx, magnifiaction)
        //for debugging
        this.playerBox.draw(ctx, magnifiaction)
    }
}