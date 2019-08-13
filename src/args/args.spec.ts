import { cli, Params } from './args'
describe('args test', () => {
  it.each([
    ['-l', new Params(true)],
    ['', new Params()],
    ['-l -p 8080', new Params(true, 8080)],
    ['-p 8080 -d /usr/logs', new Params(false, 8080, '/usr/logs')],
    ['-p 8080 -d /usr/logs -g this,is,a,list', new Params(false, 8080, '/usr/logs', ['this', 'is', 'a', 'list'])],
    ['-p 8080 -d /usr/logs -dd 1,2,3', new Params(false, 8080, '/usr/logs', [], [1, 2, 3])]
  ])(
    'with %s should %s',
    (input: string, expected: Params) => {
      expect(cli(input)).toEqual(expected)
    }
  );
});