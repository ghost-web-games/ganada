import { GUI } from "dat.gui"
import { Mouse } from "./mouse"
import AppFactory from "./factory/appfactory"
import IDraw from "./interface/IDraw"


export default class App {
    static dpr = devicePixelRatio > 1 ? 2 : 1
    static interval = 1000 / 30
    static width = innerWidth
    static height = innerHeight
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    mouse: Mouse
    currentScene: IDraw
    gui: GUI
    magnification: number
    factory: AppFactory

    constructor() {
        this.factory = new AppFactory(16)
        this.canvas = this.factory.Canvas
        this.ctx = this.factory.Context
        this.mouse = this.factory.Mouse
        this.gui = this.factory.Gui

        this.magnification = 2

       this. factory.Scene.gameInit()
        this.currentScene = this.factory.Scene

        this.resize()
        window.addEventListener('resize', this.resize.bind(this))
    }

    public init() {
        this.resize()
        //this.gui.add(this, "magnification")
    }

    public render() {
        let now, delta
        let then = Date.now()

        const frame = () => {
            requestAnimationFrame(frame)

            now = Date.now()
            delta = now - then
            if (delta < App.interval) return

            this.currentScene.update()
            this.currentScene.draw(this.ctx, this.magnification)
         
            then = now - (delta % App.interval)
        }

        requestAnimationFrame(frame)
    }
    resize() {
        this.factory.Width = App.width = innerWidth
        this.factory.Height = App.height = innerHeight
        this.canvas.style.width = App.width + "px"
        this.canvas.style.height = App.height + "px"
        this.canvas.width = App.width * App.dpr
        this.canvas.height = App.height * App.dpr
        this.ctx?.scale(App.dpr, App.dpr)
        this.currentScene.resize(this.canvas.width / App.dpr, this.canvas.height / App.dpr)
    }
}