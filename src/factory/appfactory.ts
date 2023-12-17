import { Mouse } from "../mouse"
import { GUI } from "dat.gui"
import { Background } from "../objects/background"
import Player from "../objects/player"
import { UserController } from "../contoller/usercontoller"
import Words from "../objects/words"
import IScene from "../interface/IScene"
import Scene from "../scene/scene"


export default class AppFactory {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    mouse: Mouse
    gui: GUI
    backgrounds: Background[]
    player: Player
    userCtrl: UserController
    words: Words
    scene: IScene

    constructor(gridPixel: number) {
        this.canvas = document.querySelector('canvas') as HTMLCanvasElement
        const width = this.canvas.width
        const height = this.canvas.height
        this.ctx = this.canvas.getContext('2d')

        this.mouse = new Mouse(this.canvas)
        this.gui = new GUI()
        this.backgrounds = [
            new Background({
                img: document.querySelector('#bg1-img') as HTMLImageElement,
                pixel: gridPixel, mag: 1, width: width, height: height,
                tiles: [0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 42],
                idleTiles: []
            })
        ]
        this.player = new Player({
            img: document.querySelector('#player') as HTMLImageElement, 
            pixel: gridPixel, mag: 1, width: width, height: height,
            tiles: [13, 16/*, 19, 22*/], idleTiles: []
        })
        this.userCtrl = new UserController({
            pixel: gridPixel, mag: 1, width: width, height: height,
        })
        this.words = new Words({
            pixel: gridPixel, mag: 1, width: width, height: height
        })
        this.scene = new Scene(this)
        this.scene.gameInit()
    }
    get Scene(): IScene { return this.scene }
    get Word(): Words {return this.words}
    get UserCtrl(): UserController { return this.userCtrl }
    get Canvas(): HTMLCanvasElement { return this.canvas }
    get Context(): CanvasRenderingContext2D | null { return this.ctx}
    get Mouse(): Mouse { return this.mouse }
    get Gui(): GUI { return this.gui }
    get Backgrounds(): Background[] { return this.backgrounds }
    get Player(): Player { return this.player }
}