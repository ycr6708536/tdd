export class Gamer {
  static say(num: number): string {
    let res = ''
    if (num % 3 === 0) res += 'Fizz'
    if (num % 5 === 0) res += 'Buzz'
    if (num % 3 !== 0 && num % 5 !== 0) return num.toString()
    return res
  }

}