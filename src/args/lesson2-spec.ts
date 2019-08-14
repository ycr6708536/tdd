import { Params, Schema, Args } from './lesson2'


describe('schema test', () => {
  let schema = new Schema('l:boolean,d:string,p:number')
  it('should get Boolean with l:boolean', () => {
    expect(schema.getValue('l', 'true')).toEqual(true)
    expect(schema.getValue('l', 'false')).toEqual(false)
    expect(schema.getValue('l', '')).toEqual(false)
  });

  it('should get string with d:string', () => {
    expect(schema.getValue('d', '123')).toEqual('123')
  });

  it('should get number with p:number', () => {
    expect(schema.getValue('p', '1')).toEqual(1)
    expect(schema.getValue('p', '-1')).toEqual(-1)
    expect(schema.getValue('p', 'a-1')).toEqual(NaN)
  });

});

describe('params test', () => {
  const params = new Params('-l -d /loc/test -p -8')
  it.each([
    ['l', ''],
    ['d', '/loc/test'],
    ['p', '-8'],
  ])(
    'params_parse(%s) should get $s',
    (input: string, expected: string) => {
      expect(params.parse(input)).toBe(expected);
    }
  );
});

describe('Args test', () => {
  let schema = new Schema('l:boolean,d:string,p:number')


  it.each([
    ['-l true', 'l', true],
    ['-l', 'l', false],
    ['-l -d /loc/test', 'd', '/loc/test'],
    ['-l -d /loc/test -p 8080', 'p', 8080],
    ['-l -d /loc/test -p -8080', 'p', -8080],
  ])(
    'with %s get %s should toBe %o',
    (input: string, key: string, expected: any) => {
      expect(new Args(schema, new Params(input)).getValue(key)).toBe(expected);
    }
  );
});
