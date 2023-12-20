import IDraw from "../interface/IDraw";
import { getAngle } from "../libs/utils"
import Vector from "../libs/vector"
import { IMouseEvent } from "../mouse"
import * as pxutil from "../libs/pixelutil"
import { ObjConfig } from "../models/objconfig"

export enum Direction {
    None = 0,
    Up,
    Down,
    Left,
    Right
}

export interface IMover {
    InitCoord(playerCoord: Vector, dir: Direction): void
    MoveStart(playerCoord: Vector, dir: Direction): void
    Moving(playerCoord: Vector, dir: Direction): void
    MoveEnd(playerCoord: Vector, dir: Direction): void
}

enum MoveType {
    None,
    MoveStart,
    Moving,
    MoveEnd
}

type MoveOp = {
    moveType: MoveType
    playerCoord: Vector
    dir: Direction
}

export class UserController implements IDraw, IMouseEvent {
    width: number
    height: number
    playerCoord: Vector
    movingFlag: boolean
    centerPos: Vector
    pixel: number
    mag: number
    controlObj: Array<IMover>
    dir: Direction
    moveOp: MoveOp
    
    constructor(config: ObjConfig) {
        this.pixel = config.pixel
        this.mag = config.mag
        this.movingFlag = false
        this.height = pxutil.pixelFitUp(config.height, config.pixel)
        this.width = pxutil.pixelFitUp(config.width, config.pixel)

        this.playerCoord = new Vector(this.viewpixel * 1024, this.viewpixel * 1024)
        this.centerPos = new Vector((config.width - this.viewpixel) / 2,
            (config.height - this.viewpixel) / 2)
        this.controlObj = new Array<IMover>()
        this.dir = Direction.Down
        this.moveOp = {moveType: MoveType.None, playerCoord: this.playerCoord, dir: this.dir}
    }
    get viewpixel() : number {
        return this.pixel * this.mag
    }
    public RegisterMover(obj: IMover) {
        this.controlObj.push(obj)
        obj.InitCoord(this.playerCoord, this.dir)
    }
    public ClearMover() {
        this.controlObj.length = 0
    }

    OverEvent(x: number, y: number): void {
    }
    ClickUpEvent(x: number, y: number): void {
        if (this.moveOp.moveType == MoveType.MoveEnd) return
        this.movingFlag = false
        this.moveOp = {
            moveType: MoveType.MoveEnd, playerCoord: this.playerCoord, dir: this.dir
        }
    }
    ClickEvent(x: number, y: number): void {
        if (this.moveOp.moveType == MoveType.MoveStart) return

        const angle = getAngle(this.centerPos, new Vector(x, y))
        if (angle < 45 && angle > -45) {
            // right
            this.playerCoord.x -= this.viewpixel
            this.dir = Direction.Right
            if (this.playerCoord.x < 0) this.playerCoord.x = 0
        } else if (angle < -45 && angle > -135) {
            // up
            this.playerCoord.y += this.viewpixel
            this.dir = Direction.Up
        } else if (angle < -135 || angle > 135) {
            // left
            this.playerCoord.x += this.viewpixel
            this.dir = Direction.Left
        } else {
            // down
            this.playerCoord.y -= this.viewpixel
            if (this.playerCoord.y < 0) this.playerCoord.y = 0
            this.dir = Direction.Down
        }
        this.movingFlag = true
        this.moveOp = {
            moveType: MoveType.MoveStart, playerCoord: this.playerCoord, dir: this.dir
        }
    }
    public update() {
        switch (this.moveOp.moveType) {
            case MoveType.None: break;
            case MoveType.MoveStart:
                this.controlObj.forEach(obj => {
                    obj.MoveStart(this.moveOp.playerCoord, this.moveOp.dir)
                });
                break;
            case MoveType.Moving: break;
            case MoveType.MoveEnd:
                this.controlObj.forEach(obj => {
                    obj.MoveEnd(this.moveOp.playerCoord, this.moveOp.dir)
                });
                break;
        }
        this.moveOp.moveType = MoveType.None
    }
    public checkOutrange(): boolean { return false }

    public resize(width: number, height: number) {
        this.width = width
        this.height = height
        this.centerPos = new Vector((width - this.viewpixel) / 2,
            (height - this.viewpixel) / 2)
    }

    public draw(ctx: CanvasRenderingContext2D | null, magnifiaction: number) {
        if (ctx == null) return
    }
}