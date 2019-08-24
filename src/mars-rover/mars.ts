export enum Direction {
  N,
  S,
  E,
  W
}
export class Rover {
  X: number;
  Y: number;
  x: number;
  y: number;
  o: Direction;

  doDirect(directs: Direct)
  doDirect(directs: Direct[])

  doDirect(directs: Direct | Direct[]) {
    if (directs instanceof Direct) {
      directs.doDirect(this)
      return
    }
    directs.forEach(direct => {
      direct.doDirect(this)
    })
  }
}

export abstract class Direct {
  abstract doDirect(rover: Rover): Rover

  static getExploreDirect(X: number, Y: number): Direct {
    return new ExploreDirect(X, Y)
  }
}

export class ExploreDirect extends Direct {
  doDirect(rover: Rover): Rover {
    rover.X = this.X
    rover.Y = this.Y
    return rover
  }
  X: number
  Y: number
  constructor(X: number, Y: number) {
    super()
    this.X = X
    this.Y = Y
  }
}

export class InitDirect extends Direct {
  doDirect(rover: Rover): Rover {
    rover.x = this.x
    rover.y = this.y
    rover.o = this.o
    return rover
  }
  x: number
  y: number
  o: Direction
  constructor(x: number, y: number, o: Direction) {
    super()
    this.x = x
    this.y = y
    this.o = o
  }
}

export class MoveDirect extends Direct {
  doDirect(rover: Rover): Rover {
    return this.move[this.direction + rover.o](rover)
  }

  move: Object = {
    ['b' + Direction.E]: (rover) => { rover.x -= 1; return rover },
    ['f' + Direction.E]: (rover) => { rover.x += 1; return rover },
    ['b' + Direction.W]: (rover) => { rover.x += 1; return rover },
    ['f' + Direction.W]: (rover) => { rover.x -= 1; return rover },
    ['b' + Direction.N]: (rover) => { rover.y += 1; return rover },
    ['f' + Direction.N]: (rover) => { rover.y -= 1; return rover },
    ['b' + Direction.S]: (rover) => { rover.y -= 1; return rover },
    ['f' + Direction.S]: (rover) => { rover.y += 1; return rover },
  }

  direction: string

  constructor(direction: string) {
    super()
    if (!['b', 'f'].includes(direction)) {
      throw new Error(`未知方向${direction}`)
    }
    this.direction = direction
  }
}


export class TurnDirect extends Direct {
  doDirect(rover: Rover): Rover {
    rover.o = this.turn[this.direction + rover.o]()
    return rover
  }
  turn: Object = {
    ['l' + Direction.N]: () => Direction.W,
    ['r' + Direction.N]: () => Direction.E,
    ['l' + Direction.S]: () => Direction.E,
    ['r' + Direction.S]: () => Direction.W,
    ['l' + Direction.W]: () => Direction.S,
    ['r' + Direction.W]: () => Direction.N,
    ['l' + Direction.E]: () => Direction.N,
    ['r' + Direction.E]: () => Direction.S,
  }
  direction: string
  constructor(direction: string) {
    super()
    if (!['l', 'r'].includes(direction)) {
      throw new Error(`未知方向${direction}`)
    }
    this.direction = direction
  }
}