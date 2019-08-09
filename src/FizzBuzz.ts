export class Gamer {

  val: number
  constructor(val: number) {
    this.val = val
  }

  isDivisible(num: number): boolean {
    return this.val % num === 0
  }

  say(): string {
    if (this.isDivisible(3) && this.isDivisible(5)) {
      return 'FizzBuzz'
    }

    if (this.isDivisible(3)) {
      return 'Fizz';
    }

    if (this.isDivisible(5)) {
      return 'Buzz'
    }

    return this.val.toString()
  }
}