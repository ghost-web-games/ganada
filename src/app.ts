import { GUI } from "dat.gui"
import { Mouse } from "./mouse"
import AppFactory from "./factory/appfactory"
import { IDraw } from "./interface/IDraw"
import { IBox } from "./objects/boundingbox"
import Player from "./objects/player"
import Words from "./objects/words"


export default class App {
    static dpr = devicePixelRatio > 1 ? 2 : 1
    static interval = 1000 / 60
    static width = innerWidth
    static height = innerHeight
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    mouse: Mouse
    drawObject: Array<IDraw>
    gui: GUI
    magnification: number
    player: Player
    words: Words

    constructor() {
        const factory = new AppFactory(16)
        this.canvas = factory.Canvas
        this.ctx = factory.Context
        this.mouse = factory.Mouse
        this.gui = factory.Gui

        this.drawObject = new Array<IDraw>()
        this.magnification = 2

        const userCont = factory.UserCont
        this.drawObject.push(userCont)
        this.mouse.RegisterHandler(userCont)

        const bgs = factory.Backgrounds
        bgs.forEach((bg) => {
            this.drawObject.push(bg)
            userCont.RegisterMover(bg)
        })

        this.player = factory.Player
        this.drawObject.push(this.player)
        userCont.RegisterMover(this.player)

        this.words = factory.Word
        this.drawObject.push(this.words)
        userCont.RegisterMover(this.words)

        this.resize()
        window.addEventListener('resize', this.resize.bind(this))
    }

    public init() {
        this.resize()
        this.gui.add(this, "magnification")
    }

    public render() {
        let now, delta
        let then = Date.now()

        const frame = () => {
            requestAnimationFrame(frame)

            now = Date.now()
            delta = now - then
            if (delta < App.interval) return

            this.words.CollidingCheck(this.player)

            this.drawObject.forEach((o) => {
                o.update()
            })
            this.drawObject.forEach((o) => {
                o.draw(this.ctx, this.magnification)
            })
         
            then = now - (delta % App.interval)
        }

        requestAnimationFrame(frame)
    }
    resize() {
        this.canvas.style.width = App.width + "px"
        this.canvas.style.height = App.height + "px"
        this.canvas.width = App.width * App.dpr
        this.canvas.height = App.height * App.dpr
        this.ctx?.scale(App.dpr, App.dpr)
        this.drawObject.forEach((o) => {
            o.resize(this.canvas.width / App.dpr, this.canvas.height / App.dpr)
        })
    }
}