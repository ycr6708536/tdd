import { Rover, Direction, ExploreDirect, InitDirect, MoveDirect, TurnDirect } from './mars'

describe('Mars rover test', () => {
  let rover = new Rover()

  it('should direct area with 3,4', () => {
    let direct = new ExploreDirect(3, 4);
    rover = direct.doDirect(rover)
    expect(rover.X).toBe(3)
    expect(rover.Y).toBe(4)
  });

  it('should init direct with 0,1, E', () => {
    let exploreDirect = new ExploreDirect(3, 4)
    rover.doDirect(exploreDirect)
    let initDirect = new InitDirect(1, 2, Direction.W)
    rover.doDirect(initDirect)
    expect(rover.x).toBe(1)
    expect(rover.y).toBe(2)
    expect(rover.o).toBe(Direction.W)
    let moveBack = new MoveDirect('b')
    let moveFront = new MoveDirect('f')
    rover.doDirect(moveBack)
    expect(rover.x).toBe(2)
    expect(rover.y).toBe(2)

    expect(rover.o).toBe(Direction.W)
    rover.doDirect(moveFront)
    expect(rover.x).toBe(1)
    expect(rover.y).toBe(2)
    expect(rover.o).toBe(Direction.W)

    let turnL = new TurnDirect('l')
    rover.doDirect(turnL)
    expect(rover.o).toBe(Direction.S)
  });

  it('batch direct test', () => {
    let direct = new ExploreDirect(3, 4);
    let initDirect = new InitDirect(1, 2, Direction.W)
    let moveBack = new MoveDirect('b')
    let moveFront = new MoveDirect('f')
    let turnL = new TurnDirect('l')
    rover.doDirect([direct, initDirect, moveBack, moveFront, turnL])
    expect(rover.X).toBe(3)
    expect(rover.Y).toBe(4)
    expect(rover.x).toBe(1)
    expect(rover.y).toBe(2)
    expect(rover.o).toBe(Direction.S)
  });
});


