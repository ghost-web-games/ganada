import { ImgObjConfig } from "../models/objconfig"
import Vector from "../libs/vector"

export interface IMoveState{
    draw(ctx: CanvasRenderingContext2D | null, magnifiaction: number): void
    resize(width: number, height: number): void
    update(): void
    set Moving(move: boolean)
}

export class MoveState implements IMoveState{
    img: HTMLImageElement
    pixel: number
    tileVec: Array<Vector>
    idleTileVec: Array<Vector>
    pos: Vector
    width: number
    height: number
    imgseq: number
    frame: number
    mag: number
    static moving: boolean

    constructor(config: ImgObjConfig) {
        this.img = config.img
        this.pixel = config.pixel
        this.width = config.width
        this.height = config.height
        this.mag = config.mag
        this.frame = this.imgseq = 0
        this.pos = new Vector((config.width - this.viewpixel) / 2,
            (config.height - this.viewpixel) / 2)

        this.tileVec = this.selectTile(config.tiles)
        this.idleTileVec = this.selectTile(config.idleTiles)
        MoveState.moving = false
        
    }
    set Moving(move: boolean) { MoveState.moving = move }
    get viewpixel(): number {
        return this.pixel * this.mag
    }
    public selectTile(offsets: number[]): Array<Vector> {
        const ret = new Array<Vector>()
        offsets.forEach((offset) => {
            const x = offset % (this.img.width / this.pixel) * this.pixel
            const y = Math.floor(offset / (this.img.width / this.pixel)) * this.pixel
            const v = new Vector(x, y)
            ret.push(v)
        })
        return ret
    }
    public resize(width: number, height: number) {
        this.width = width
        this.height = height
        this.pos = new Vector((this.width - this.viewpixel) / 2,
            (this.height - this.viewpixel) / 2)
    }

    public update() {
        if (++this.frame % 6 === 0) {
            this.imgseq = ++this.imgseq % this.tileVec.length
        }
    }
    public draw(ctx: CanvasRenderingContext2D | null, magnifiaction: number) {
        if (ctx == null) return
        if (this.mag != magnifiaction) {
            this.mag = magnifiaction
        }
        const pos = (!MoveState.moving)? this.idleTileVec[this.imgseq]:this.tileVec[this.imgseq]

        ctx.drawImage(this.img,
            pos.x, pos.y, this.pixel, this.pixel,
            this.pos.x, this.pos.y, this.viewpixel, this.viewpixel)
    }
}
/*
export class IdleMoveState extends MoveState implements IMoveState {
    constructor(config: ObjConfig) {
        super(config)
    }
}
export class RightMoveState extends MoveState implements IMoveState {
    constructor(config: ObjConfig) {
        super(config)
    }
}
export class UpMoveState extends MoveState implements IMoveState {
    constructor(config: ObjConfig) {
        super(config)
    }
}
export class LeftMoveState extends MoveState implements IMoveState {
    constructor(config: ObjConfig) {
        super(config)
    }
}
export class DownMoveState extends MoveState implements IMoveState {
    constructor(config: ObjConfig) {
        super(config)
    }
}
*/