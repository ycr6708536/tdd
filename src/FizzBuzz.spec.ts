import { Gamer } from './FizzBuzz'

describe('test game number', () => {

  function testNumberSay(num: number, say: string) {
    let game = new Gamer(num)
    expect(game.say()).toBe(say)
  }

  it('say 1 whit 1', () => {
    testNumberSay(1, '1')
  })

  it('say Fizz whit 3', () => {
    testNumberSay(3, 'Fizz')
  })

  it('say Buzz with 5', () => {
    testNumberSay(5, 'Buzz')
  })

  it('say FizzBuzz with 15', () => {
    testNumberSay(15, 'FizzBuzz')
  })
})
