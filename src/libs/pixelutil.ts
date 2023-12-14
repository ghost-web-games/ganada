export const pixelFitDown = (x: number, pixel: number): number => {
    return x - x % pixel
}
export const pixelFitUp = (x: number, pixel: number): number => {
    const mod = x % pixel
    return (mod > 0) ? x + pixel - mod : x
}