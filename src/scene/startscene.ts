import { gsap, Elastic } from "gsap";
import AppFactory from "../factory/appfactory";
import IScene, { SceneMode } from "../interface/IScene";
import Vector from "../libs/vector";
import IDraw from "../interface/IDraw";

export default class StartScene implements IScene {
    readyScreen: HTMLElement
    playBtn: HTMLElement
    title: HTMLElement
    help: HTMLElement
    centerPos: Vector
    drawObject: Array<IDraw>

    constructor(private factory: AppFactory, private scene: IScene) {
        this.readyScreen = document.querySelector('.ready-screen') as HTMLElement
        this.title = this.readyScreen.querySelector('.title-text') as HTMLElement
        this.help = this.readyScreen.querySelector('.help-text') as HTMLElement
        this.playBtn = this.readyScreen.querySelector('.play-img') as HTMLElement
        this.playBtn.addEventListener('click', this.nextScene.bind(this))


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
        gsap.to(this.title, {
            scale: 1, duration: 1, ease: Elastic.easeOut.config(2, 0.5), delay: 0.5
        })
        gsap.to(this.help, {
            scale: 1, duration: 1, ease: Elastic.easeOut.config(2, 0.5), delay: 0.5
        })
    }
    gameRelease() {
        this.drawObject.length = 0
    }

    nextScene() {
        gsap.to(this.readyScreen, {
            opacity: 0, pointerEvents: 'none', duration: 0.3, onComplete: () => {
                this.scene.changeScene(SceneMode.Ready)
            }
        })
        gsap.to(this.title, {
            opacity: 0, pointerEvents: 'none', duration: 0.3, onComplete: () => {}
        })
        gsap.to(this.help, {
            opacity: 0, pointerEvents: 'none', duration: 0.3, onComplete: () => {}
        })
        
    }

    changeScene(next: SceneMode): void { }
    update(): void {
    }
    public checkOutrange(): boolean { return false }

    draw(ctx: CanvasRenderingContext2D | null, magnification: number): void {
        if (ctx == null) return
        this.drawObject.forEach((o) => {
            o.draw(ctx, magnification)
        })
    }

    resize(width: number, height: number) {
        this.centerPos = new Vector((width) / 2, (height) / 2)
        this.drawObject.forEach((o) => {
            o.resize(width, height)
        })
    }
}