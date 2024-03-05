export type Notebook = {
  id: number,
  code: number,
  model: string 
  brand: {name: string},
  system: {name: string},
  system_version: string,
  processor: {
    brand: { 
      name: string
    },
    model: string,
    clock: number,
  },
  graphics_card: {
    model: string,
    brand: {
      name: string
    }
  }
  hd: number,
  ssd: number,
  ram: number,
  ddr: number,
  resolution: string,
  inch: number,
  hertz: number,
  touch: boolean,
  note: string,
  photos: [{path: string}]
}