import { IDraw } from "../interface/IDraw";
import Vector from "../libs/vector";
import { ImgObjConfig } from "../models/objconfig";

export default class StatusBoard implements IDraw {
    pos: Vector
    pixel: number
    mag: number

    constructor(config: ImgObjConfig) {
        this.mag = config.mag
        this.pixel = config.pixel
        this.pos = new Vector(0, 0)
    }

    public resize(width: number, height: number) {
        this.pos = new Vector((width - this.viewpixel) / 2,
            (height - this.viewpixel) / 2)
    }

    get viewpixel(): number {
        return this.pixel * this.mag
    }

    public update() {
    }

    public draw(ctx: CanvasRenderingContext2D | null, magnifiaction: number) {
    }
}