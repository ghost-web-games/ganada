import { Mouse } from "../mouse"
import { GUI } from "dat.gui"
import { Background } from "../objects/background"
import Player from "../objects/player"
import { UserController } from "../contoller/usercontoller"
import Words from "../objects/words"
import IScene from "../interface/IScene"
import Scene from "../scene/scene"
import Coin from "../effect/coin"
import App from "../app"
import GameStore from "../models/gamestore"


export default class AppFactory {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    mouse: Mouse
    //gui: GUI
    backgrounds: Background[]
    player: Player
    coin: Coin
    userCtrl: UserController
    words: Words
    scene: IScene
    gamdStore: GameStore
    gridPixel: number
    width: number
    height: number

    constructor(gridPixel: number) {
        this.canvas = document.querySelector('canvas') as HTMLCanvasElement
        this.width = this.canvas.width / App.dpr
        this.height = this.canvas.height / App.dpr
        this.ctx = this.canvas.getContext('2d')
        this.gridPixel = gridPixel

        this.mouse = new Mouse(this.canvas)
        //this.gui = new GUI()
        this.backgrounds = [
            new Background({
                img: document.querySelector('#bg1-img') as HTMLImageElement,
                imagePixel: gridPixel, pixel: gridPixel, mag: 1, width: this.width, height: this.height,
                tiles: [0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 42],
                idleTiles: []
            })
        ]
        this.player = new Player({
            img: document.querySelector('#player') as HTMLImageElement, 
            imagePixel: gridPixel, pixel: gridPixel, mag: 1, width: this.width, height: this.height,
            tiles: [13, 16/*, 19, 22*/], idleTiles: []
        })
        this.coin = new Coin({
            img: document.querySelector('#coin') as HTMLImageElement, 
            imagePixel: 60, pixel: gridPixel, mag: 1, width: this.width, height: this.height,
            tiles: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], idleTiles: []
        })
        this.userCtrl = new UserController({
            pixel: gridPixel, mag: 1, width: this.width, height: this.height,
        })
        this.words = new Words({
            pixel: gridPixel, mag: 1, width: this.width, height: this.height
        })
        this.gamdStore = new GameStore()

        this.scene = new Scene(this)
        this.scene.gameInit()
    }
    get NewCoin(): Coin {
        return new Coin({
            img: document.querySelector('#coin') as HTMLImageElement, 
            imagePixel: 60, pixel: this.gridPixel, mag: 1, 
            width: this.width, height: this.height,
            tiles: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], idleTiles: []
        })

    }
    get GameStore(): GameStore { return this.gamdStore }
    get Coin(): Coin { return this.coin }
    get Scene(): IScene { return this.scene }
    get Word(): Words {return this.words}
    get UserCtrl(): UserController { return this.userCtrl }
    get Canvas(): HTMLCanvasElement { return this.canvas }
    get Context(): CanvasRenderingContext2D | null { return this.ctx}
    get Mouse(): Mouse { return this.mouse }
    //get Gui(): GUI { return this.gui }
    get Backgrounds(): Background[] { return this.backgrounds }
    get Player(): Player { return this.player }
    set Width(width: number) { this.width = width }
    set Height(height: number) { this.height = height }
}