import { Mouse } from "../mouse"
import AssetLoader from "../editor/assetloader"
import Grid from "../editor/grid"
import { GUI } from "dat.gui"
import TileMap from "../editor/tilemap"


export default class EditorFactory {
    grid: Grid
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    mouse: Mouse
    grass: AssetLoader
    gui: GUI
    tilemap: TileMap

    constructor(gridPixel: number) {
        this.canvas = document.querySelector('canvas') as HTMLCanvasElement
        const width = this.canvas.width
        const height = this.canvas.height
        this.ctx = this.canvas.getContext('2d')

        this.mouse = new Mouse(this.canvas)
        this.grid = new Grid(width, height, gridPixel)
        this.grass = new AssetLoader("#bg1-img", gridPixel)
        this.gui = new GUI()
        this.tilemap = new TileMap(width, height, gridPixel, "#bg1-img")
    }
    get Grid(): Grid { return this.grid }
    get Canvas(): HTMLCanvasElement { return this.canvas }
    get Context(): CanvasRenderingContext2D | null { return this.ctx}
    get Mouse(): Mouse { return this.mouse }
    get Grass(): AssetLoader { return this.grass }
    get Gui(): GUI { return this.gui }
    get TileMap(): TileMap { return this.tilemap }
}