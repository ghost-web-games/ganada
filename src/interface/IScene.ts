import IDraw from "./IDraw";

export enum SceneMode {
    Start,
    Ready,
    Play,
    End,
}
export default interface IScene extends IDraw {
    changeScene(next: SceneMode): void
    gameInit(): void
    gameRelease(): void
}