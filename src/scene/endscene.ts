import AppFactory from "../factory/appfactory";
import IScene, { SceneMode } from "../interface/IScene";

export default class EndScene implements IScene{
    constructor(factory: AppFactory, scene:IScene) {

    }
    gameInit() {}
    gameRelease() {}

    changeScene(next: SceneMode): void { }

    update(): void {
    }
    public checkOutrange(): boolean { return false }

    draw(ctx: CanvasRenderingContext2D | null, magnification: number): void {
    }

    resize(width: number, height: number) {
    }
}