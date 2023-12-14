import { Mouse } from "../mouse"
import { GUI } from "dat.gui"
import { Background } from "../objects/background"
import Player from "../objects/player"
import { UserController } from "../contoller/usercontoller"
import Words from "../objects/words"


export default class AppFactory {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    mouse: Mouse
    gui: GUI
    backgrounds: Background[]
    player: Player
    userCont: UserController
    words: Words

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
                pixel: 16, mag: 1, width: width, height: height,
                tiles: [0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 42],
                idleTiles: []
            })
        ]
        this.player = new Player({
            img: document.querySelector('#player') as HTMLImageElement, 
            pixel: 16, mag: 1, width: width, height: height,
            tiles: [13, 16/*, 19, 22*/], idleTiles: []
        })
        this.userCont = new UserController({
            pixel: 16, mag: 1, width: width, height: height,
        })
        this.words = new Words({
            pixel: 16, mag: 1, width: width, height: height
        })
    }
    get Word(): Words {return this.words}
    get UserCont(): UserController { return this.userCont }
    get Canvas(): HTMLCanvasElement { return this.canvas }
    get Context(): CanvasRenderingContext2D | null { return this.ctx}
    get Mouse(): Mouse { return this.mouse }
    get Gui(): GUI { return this.gui }
    get Backgrounds(): Background[] { return this.backgrounds }
    get Player(): Player { return this.player }
}