import AppFactory from "../factory/appfactory";
import IDraw from "../interface/IDraw";
import IScene, { SceneMode } from "../interface/IScene";
import Player from "../objects/player";
import Words from "../objects/words";

export default class PlayScene implements IScene {
    factory: AppFactory
    drawObject: Array<IDraw>
    player: Player
    words: Words
    scene: IScene
    width: number
    height: number

    constructor(factory: AppFactory, scene: IScene) {
        this.factory = factory
        this.scene = scene
        this.drawObject = new Array<IDraw>()
        this.player = factory.player
        this.words = factory.words
        this.width = this.height = 0
        this.gameInit()
    }

    changeScene(next: SceneMode): void { }

    gameInit() {
        const userCont = this.factory.UserCtrl
        this.drawObject.push(userCont)
        this.factory.mouse.RegisterHandler(userCont)

        const bgs = this.factory.Backgrounds
        bgs.forEach((bg) => {
            this.drawObject.push(bg)
            userCont.RegisterMover(bg)
        })

        const player = this.factory.Player
        this.drawObject.push(player)
        userCont.RegisterMover(player)

        const words = this.factory.Word
        this.drawObject.push(words)
        userCont.RegisterMover(words)
        this.drawObject.forEach((o) => {
            o.resize(this.width, this.height)
        })
    }
    gameRelease() {
        this.drawObject.length = 0
    }

    update(): void {
    }

    draw(ctx: CanvasRenderingContext2D | null, magnification: number): void {
        this.words.CollidingCheck(this.player)

        this.drawObject.forEach((o) => {
            o.update()
        })
        this.drawObject.forEach((o) => {
            o.draw(ctx, magnification)
        })
    }

    resize(width: number, height: number) {
        this.width = width
        this.height = height
        this.drawObject.forEach((o) => {
            o.resize(width, height)
        })
    }
}