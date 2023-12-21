import AppFactory from "../factory/appfactory";
import IDraw from "../interface/IDraw";
import IScene, { SceneMode } from "../interface/IScene";
import GameStore from "../models/gamestore";
import Player from "../objects/player";
import Words from "../objects/words";

export default class PlayScene implements IScene {
    drawObject: Array<IDraw>
    player: Player
    words: Words
    gameStore: GameStore
    width: number
    height: number
    targetWordCount: number
    speak: SpeechSynthesisUtterance

    constructor(private factory: AppFactory, private scene: IScene) {
        this.drawObject = new Array<IDraw>()
        this.player = factory.player
        this.words = factory.words
        this.width = this.height = 0
        this.gameStore = factory.GameStore
        this.targetWordCount = 0
        this.speak = new SpeechSynthesisUtterance()
    }

    changeScene(next: SceneMode): void { }
    soundUpdate() {
        window.speechSynthesis.cancel()
        const wordlist = this.gameStore.GetWord().Wordlist
        if (wordlist.length == 0) return

        this.speak.text = wordlist[0]
        this.speak.lang = 'ko'
        this.speak.onend = () => {
            window.speechSynthesis.speak(this.speak)
        }
        window.speechSynthesis.speak(this.speak)
    }

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

        const wordEntry = this.gameStore.GetWord()
        this.words.NewWords(wordEntry.Word, wordEntry.Wordlist)
        this.drawObject.push(this.words)
        this.targetWordCount = wordEntry.Wordlist.length

        userCont.RegisterMover(this.words)
        this.drawObject.forEach((o) => {
            o.resize(this.width, this.height)
        })
        this.soundUpdate()
    }
    gameRelease() {
        this.drawObject.length = 0
        const mouse = this.factory.Mouse
        mouse.ClearHandler()
        const userCont = this.factory.UserCtrl
        userCont.ClearMover()
    }

    update(): void {
        if (this.words.CollidingCheck(this.player)) {
            const userCont = this.factory.UserCtrl
            const coin = this.factory.NewCoin
            this.drawObject.push(coin)
            this.soundUpdate()
        }
        this.drawObject.forEach((o) => {
            o.update()
        })
    }
    public checkOutrange(): boolean { return false }

    draw(ctx: CanvasRenderingContext2D | null, magnification: number): void {
        this.drawObject.forEach((o) => {
            o.draw(ctx, magnification)
        })

        for (let i = 0; i < this.drawObject.length; i++) {
            if (this.drawObject[i].checkOutrange()) {
                this.drawObject.splice(i, 1)
                if(--this.targetWordCount == 0) {
                    this.scene.changeScene(SceneMode.Ready)
                }
            }
        }
    }

    resize(width: number, height: number) {
        this.width = width
        this.height = height
        this.drawObject.forEach((o) => {
            o.resize(width, height)
        })
    }
}