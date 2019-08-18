import { Params, Schema, Spec, Args } from './lesson4'

describe('params test case', () => {
  const params = new Params('-l -p 8080 -d /loc/test')
  it(`should get l value is ''`, () => {
    expect(params.getValue('l')).toBe('')
  });

  it(`should get p value is 8080`, () => {
    expect(params.getValue('p')).toBe('8080')
  })

  it('should get d is /loc/test', () => {
    expect(params.getValue('d')).toBe('/loc/test')
  })
});

describe('test Schema', () => {
  let schema = new Schema('l:boolean d:string p:number')

  it('should get l with boolean', () => {
    expect(schema.size()).toBe(3)
    let argSPecForL: Spec = schema.of('l')
    expect(argSPecForL.getDescription()).toBe('l:boolean')
    expect(argSPecForL.getLabel()).toBe('l')
    expect(argSPecForL.getExpectedType()).toBe('boolean')
    expect(schema.of('l')).toEqual(new Spec('l', 'boolean'))
    expect(schema.of('d')).toEqual(new Spec('d', 'string'))
    expect(schema.of('p')).toEqual(new Spec('p', 'number'))
  })
});

describe('Args test', () => {
  let schema = new Schema('l:boolean p:number d:string')
  let arg = new Args(schema, '-l -p 8080 -d /loc/test')
  it('should get true whit l', () => {
    expect(arg.getValue('l')).toBe(true)
    expect(arg.getValue('p')).toBe(8080)
    expect(arg.getValue('d')).toBe('/loc/test')
  });
});