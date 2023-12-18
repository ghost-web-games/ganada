import AppFactory from "../factory/appfactory";
import IScene, { SceneMode } from "../interface/IScene";
import EndScene from "./endscene";
import PlayScene from "./playscene";
import StartScene from "./startscene";


export default class Scene implements IScene {
    currentScene: IScene
    factory: AppFactory
    scenes: Array<IScene>
    constructor(factory: AppFactory) {
        this.factory = factory
        this.scenes = new Array<IScene>()
        this.currentScene = this.scenes[SceneMode.Start]
    }

    gameInit() {
        this.scenes[SceneMode.Start] = new StartScene(this.factory)
        this.scenes[SceneMode.Play] = new PlayScene(this.factory, this)
        this.scenes[SceneMode.End] = new EndScene(this.factory, this)
        this.currentScene = this.scenes[SceneMode.Start]
    }
    gameRelease() {}

    changeScene(next: SceneMode): void {
        this.currentScene.gameRelease()
        this.currentScene = this.scenes[next]
        this.currentScene.gameInit()
    }

    update(): void {
    }
    public checkOutrange(): boolean { return false }

    draw(ctx: CanvasRenderingContext2D | null, magnification: number): void {
        this.currentScene.update()
        this.currentScene.draw(ctx, magnification)
    }

    resize(width: number, height: number) {
        this.scenes.forEach((s) => {
            s.resize(width, height)
        })
    }
}