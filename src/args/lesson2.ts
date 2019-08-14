export class Params {
  parsedParams: any
  constructor(params: string) {
    this.parsedParams = {}
    let input: string[] = params.split(' ')

    for (let i = 0; i < input.length; i++) {
      const cur = input[i];
      if (cur[0] === '-') {
        const next = input[i + 1]
        const curKey = cur.substr(1);
        if (next && next[0] === '-' && !this.isNumberStr(next)) {
          this.parsedParams[curKey] = ''
          continue
        }
        this.parsedParams[curKey] = input[++i]
      }
    }
  }

  parse(input: string): string {
    return this.parsedParams[input]
  }

  isNumberStr(val: string) {
    return /^-\d+/.test(val)
  }
}

export class Schema {
  schema: any
  constructor(schema: string) {
    this.schema = {}
    schema.split(',').forEach((item: string) => {
      let kv = item.split(':')
      if (kv.length !== 2) throw new Error('schema formatting wrong')
      this.schema[item[0]] = kv[1]
    })
  }

  getValue(key: string, value: string): any {
    switch (this.schema[key]) {
      case 'boolean':
        return this.getBooleanValue(value)
      case 'string':
        return this.getStringValue(value)
      case 'number':
        return this.getNumberValue(value)
    }
  }
  getNumberValue(value: string): number {
    return parseInt(value, 10)
  }
  getStringValue(value: string): string {
    return value
  }
  getBooleanValue(value: string): boolean {
    return value === 'true' ? true : false
  }
}

export class Args {

  schema: Schema
  params: Params
  constructor(schema: Schema, params: Params) {
    this.schema = schema
    this.params = params
  }

  getValue(key: string): any {
    return this.schema.getValue(key, this.params.parse(key))
  }

}