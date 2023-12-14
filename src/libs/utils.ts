import Vector from "./vector";

export const getAngle = (v1: Vector, v2: Vector) => {
    const rad = Math.atan2(v2.y - v1.y, v2.x - v1.x)
    return (rad * 180) / Math.PI
}