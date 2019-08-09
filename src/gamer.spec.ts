import { Gamer } from './gamer'

describe('gamer test ', () => {
  let keys = [1, 3, 5, 15]
  let says = ['1', 'Fizz', 'Buzz', 'FizzBuzz']
  keys.forEach((item: number, idx: number) => {
    it('say 1 with 1', () => {
      expect(Gamer.say(item)).toBe(says[idx])
    })
  })
})