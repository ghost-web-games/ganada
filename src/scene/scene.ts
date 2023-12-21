import AppFactory from "../factory/appfactory";
import IScene, { SceneMode } from "../interface/IScene";
import EndScene from "./endscene";
import PlayScene from "./playscene";
import ReadyScene from "./readyscene";
import StartScene from "./startscene";


export default class Scene implements IScene {
    currentScene: IScene
    factory: AppFactory
    scenes: Array<IScene>
    currentMode: SceneMode
    constructor(factory: AppFactory) {
        this.factory = factory
        this.scenes = new Array<IScene>()
        this.currentScene = this.scenes[SceneMode.Start]
        this.currentMode = SceneMode.Start
    }

    gameInit() {
        this.scenes[SceneMode.Start] = new StartScene(this.factory, this)
        this.scenes[SceneMode.Ready] = new ReadyScene(this.factory, this)
        this.scenes[SceneMode.Play] = new PlayScene(this.factory, this)
        this.scenes[SceneMode.End] = new EndScene(this.factory, this)
        this.currentScene = this.scenes[SceneMode.Start]
    }
    gameRelease() {}

    changeScene(next: SceneMode): void {
        if (this.currentMode == next)  return
        this.currentMode = next
        this.currentScene.gameRelease()
        this.currentScene = this.scenes[this.currentMode]
        this.currentScene.gameInit()
    }

    update(): void {
        this.currentScene.update()
    }
    public checkOutrange(): boolean { return false }

    draw(ctx: CanvasRenderingContext2D | null, magnification: number): void {
        this.currentScene.draw(ctx, magnification)
    }

    resize(width: number, height: number) {
        this.scenes.forEach((s) => {
            s.resize(width, height)
        })
    }
}