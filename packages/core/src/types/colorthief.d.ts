declare module 'colorthief' {
  interface IColorThief {
    getColor(img: HTMLImageElement): [number, number, number];
  }
  const ColorThief: IColorThief;
  export default ColorThief;
} 