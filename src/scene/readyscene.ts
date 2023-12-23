import AppFactory from "../factory/appfactory";
import { gsap, Elastic } from "gsap";
import IDraw from "../interface/IDraw";
import IScene, { SceneMode } from "../interface/IScene";
import Vector from "../libs/vector";
import GameStore, { WordEntry } from "../models/gamestore";
import { IMouseEvent, Mouse } from "../mouse";

export default class ReadyScene implements IScene {
    readyScreen: HTMLElement
    wordText: HTMLElement
    centerPos: Vector
    gameStore: GameStore
    nextWord: WordEntry
    drawObject: Array<IDraw>

    constructor(private factory: AppFactory, private scene: IScene) {
        this.readyScreen = document.querySelector('.ready2-screen') as HTMLElement
        this.wordText = this.readyScreen.querySelector('.word-text') as HTMLElement

        this.readyScreen.addEventListener('click', this.nextScene.bind(this))
        this.wordText.addEventListener('click', this.nextScene.bind(this))

        this.centerPos = new Vector(0, 0)
        this.gameStore = factory.GameStore
        this.nextWord = this.gameStore.GetWord()
        this.drawObject = new Array<IDraw>()
        const bgs = factory.Backgrounds
        bgs.forEach((bg) => {
            this.drawObject.push(bg)
        })
    }
    nextScene() {
        gsap.to(this.readyScreen, {
            opacity: 0, pointerEvents: 'none', duration: 0.3, onComplete: () => {
                this.scene.changeScene(SceneMode.Play)
            }
        })
        gsap.to(this.wordText, {
            opacity: 0, pointerEvents: 'none', duration: 0.3, onComplete: () => { } })
    }
    gameInit() { 
        this.nextWord = this.gameStore.NextWord()
        this.wordText.innerHTML = this.gameStore.GetWord().Word
        if (this.gameStore.SoundCheck()) {
            const speak = new SpeechSynthesisUtterance(this.nextWord.Word)
            speak.lang = 'ko'
            speak.rate = 0.7
            window.speechSynthesis.speak(speak)
        }
        gsap.fromTo(this.readyScreen, { opacity: 0}, {
            opacity: 1, duration:0.5, pointerEvents: 'all'
        })
        gsap.to(this.wordText, {
            opacity: 1, scale: 1, duration: 1, ease: Elastic.easeOut.config(2, 0.5), delay: 0.5
        })
    }

    gameRelease() { }

    changeScene(next: SceneMode): void { }

    update(): void {
    }
    public checkOutrange(): boolean { return false }

    draw(ctx: CanvasRenderingContext2D | null, magnification: number): void {
        if (ctx == null) return
        this.drawObject.forEach((o) => {
            o.draw(ctx, magnification)
        })

        /*
        ctx.font = `bold 5rem 'Cute Font'`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillStyle = "white"
        ctx.fillText(this.nextWord.Word, this.centerPos.x, this.centerPos.y - this.centerPos.y / 3)
        */
    }

    resize(width: number, height: number) {
        this.centerPos = new Vector((width) / 2, (height) / 2)
        this.drawObject.forEach((o) => {
            o.resize(width, height)
        })
    }
}