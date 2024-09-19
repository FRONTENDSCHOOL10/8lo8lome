/**@type { (min:number, max:number) => number } */
export function getRandomMinMax(min = 0, max = 10) {
  return Math.round(Math.random() * (max - min) + min);
}
