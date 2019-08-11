import { Gamer } from './gamer'

describe.each([[1, '1'], [3, 'Fizz'], [5, 'Buzz'], [15, 'FizzBuzz']])(
  '(%d) should',
  (input: number, expected: string) => {
    test(`say ${expected}`, () => {
      expect(Gamer.say(input)).toBe(expected);
    });
  }
);