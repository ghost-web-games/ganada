import { gsap, Elastic } from "gsap";
import AppFactory from "../factory/appfactory";
import IScene, { SceneMode } from "../interface/IScene";
import Vector from "../libs/vector";
import IDraw from "../interface/IDraw";

export default class StartScene implements IScene {
    readyScreen: HTMLElement
    playBtn: HTMLElement
    scene: IScene
    centerPos: Vector
    drawObject: Array<IDraw>

    constructor(factory: AppFactory) {
        this.scene = factory.scene
        this.readyScreen = document.querySelector('.ready-screen') as HTMLElement
        this.playBtn = this.readyScreen.querySelector('.play-img') as HTMLElement
        this.playBtn.addEventListener('click', () => {
            this.nextScene(this)
        })
        this.centerPos = new Vector(0, 0)
        this.drawObject = new Array<IDraw>()
        const bgs = factory.Backgrounds
        bgs.forEach((bg) => {
            this.drawObject.push(bg)
        })
        this.gameInit()
    }
    gameInit() { 
        gsap.to(this.playBtn, {
            scale: 1, duration: 1, ease: Elastic.easeOut.config(2, 0.5), delay: 0.5
        })
    }
    gameRelease() {}

    nextScene(s: StartScene) {
        gsap.to(s.readyScreen, {
            opacity: 0, pointerEvents: 'none', duration: 0.3, onComplete: () => {
                s.scene.changeScene(SceneMode.Play)
            }
        })
    }

    changeScene(next: SceneMode): void { }
    update(): void {
    }

    draw(ctx: CanvasRenderingContext2D | null, magnification: number): void {
        if (ctx == null) return
        this.drawObject.forEach((o) => {
            o.draw(ctx, magnification)
        })
        ctx.font = `bold 5rem 'Cute Font'`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.strokeStyle = "blue"
        ctx.fillStyle = "blue"
        ctx.fillText("GANADA Game", this.centerPos.x, this.centerPos.y - this.centerPos.y / 3)
    }

    resize(width: number, height: number) {
        this.centerPos = new Vector((width) / 2,
            (height) / 2)
    }
}