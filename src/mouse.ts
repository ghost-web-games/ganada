import Vector from "./libs/vector";

export interface IMouseEvent {
    ClickUpEvent(x: number, y: number): void
    ClickEvent(x: number, y: number): void
    OverEvent(x: number, y: number): void
}

export class Mouse {
    pos: Vector
    radius: number
    eventHandler: Array<IMouseEvent>

    constructor(canvas: HTMLCanvasElement) {
        this.pos = new Vector(-1000, -1000)
        this.radius = 40
        this.eventHandler = new Array<IMouseEvent>()

        canvas.onmousemove = e => this.overEvent(e.clientX, e.clientY)
        canvas.onmousedown = e => this.clickEvent(e.clientX, e.clientY)
        canvas.onmouseup = e =>this.clickupEvent(e.clientX, e.clientY) 
        canvas.ontouchstart = e => this.clickEvent(e.touches[0].clientX, e.touches[0].clientY)
        canvas.ontouchmove = e => this.overEvent(e.touches[0].clientX, e.touches[0].clientY)
        canvas.ontouchcancel = () => this.pos.setXY(-1000, -1000)
        canvas.ontouchend = (e) => this.clickupEvent(e.touches[0].clientX, e.touches[0].clientY)
    }

    overEvent(x: number, y: number) {
        this.pos.setXY(x, y)
        this.eventHandler.forEach((e) => {
            e.OverEvent(x, y)
        })
    }

    clickEvent(x: number, y: number) {
        this.pos.setXY(x, y)
        this.eventHandler.forEach((e) => {
            e.ClickEvent(x, y)
        })
    }
    clickupEvent(x: number, y: number) {
        this.pos.setXY(x, y)
        this.eventHandler.forEach((e) => {
            e.ClickUpEvent(x, y)
        })
    }
    public RegisterHandler(client: IMouseEvent) {
        this.eventHandler.push(client)
    }

    get Pos(): Vector { return this.pos }
}