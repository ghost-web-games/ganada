import AppFactory from "../factory/appfactory";
import IScene, { SceneMode } from "../interface/IScene";
import EndScene from "./endscene";
import PlayScene from "./playscene";
import ReadyScene from "./readyscene";
import StartScene from "./startscene";


export default class Scene implements IScene {
    currentScene: IScene
    scenes: Array<IScene>
    currentMode: SceneMode
    fullscreen: HTMLElement
    fullscreenFlag: boolean
    sound: HTMLElement

    constructor(private factory: AppFactory) {
        this.scenes = new Array<IScene>()
        this.currentScene = this.scenes[SceneMode.Start]
        this.currentMode = SceneMode.Start
        this.fullscreenFlag = false

        this.sound = document.querySelector('#sound') as HTMLElement
        this.sound.addEventListener('click', () => {
            if(this.factory.GameStore.SoundCheck()) {
                this.factory.GameStore.SoundOff()
                this.sound.innerHTML = "volume_off"
            } else {
                this.factory.GameStore.SoundOn()
                this.sound.innerHTML = "volume_up"
            }
        })

        this.fullscreen = document.querySelector('#fullscreen') as HTMLElement
        this.fullscreen.addEventListener('click', () => {
            if (!this.fullscreenFlag) {
                const elem = document.documentElement;
                if (elem.requestFullscreen) {
                    elem.requestFullscreen()
                }
                this.fullscreenFlag = true
                this.fullscreen.innerHTML = "close_fullscreen"
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                }
                this.fullscreenFlag = false
                this.fullscreen.innerHTML = "fullscreen"
            }
       })
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