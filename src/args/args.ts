export class Params {
  l: boolean
  p: number
  d: string
  g: string[]
  dd: number[]
  constructor(l: boolean = false, p: number = 0, d: string = '', g: string[] = [], dd: number[] = []) {
    this.l = l
    this.p = p
    this.d = d
    this.g = g
    this.dd = dd
  }
}

export function cli(arg: string) {
  let params: string[] = arg.split(' ')
  let res: Params = new Params()

  for (let i: number = 0; i < params.length; i++) {
    if (params[i] === '-l') {
      res.l = true
    } else if (params[i] === '-p') {
      res.p = parseInt(params[++i], 10)
    } else if (params[i] === '-d') {
      res.d = params[++i]
    } else if (params[i] === '-g') {
      res.g = params[++i].split(',')
    } else if (params[i] === '-dd') {
      res.dd = params[++i].split(',').map(i => parseInt(i, 10))
    }
  }

  return res
}