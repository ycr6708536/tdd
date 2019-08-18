
import { Args, Schema, Params } from './lesson3'
describe('use Args', () => {
  const schema = new Schema('l:boolean,d:string,p:number')

  it('use Args', () => {
    const params = new Params('-l -d /loc/test -p 8080')
    const args = new Args(schema, params)
    expect(args.getValue('l')).toBe(true)
    expect(args.getValue('d')).toBe('/loc/test')
    expect(args.getValue('p')).toBe(8080)
  })

  it('test -1', () => {
    const params = new Params('-l -d /loc/test -p -1')
    const args = new Args(schema, params)
    expect(args.getValue('p')).toBe(-1)
  })
});