export class Spec {
  label: string
  value: string

  constructor(label: string, value: string) {
    this.label = label
    this.value = value
  }
  getDescription() {
    return `${this.label}:${this.value}`
  }
  getExpectedType(): string {
    return this.value
  }
  getLabel(): string {
    return this.label
  }
}

export class Params {
  specList: Spec[]
  constructor(params: string) {
    const inputList: string[] = params.split(' ')
    this.specList = []
    for (let i = 0; i < inputList.length; i++) {
      const curInput = inputList[i]

      if (this.isLabel(curInput)) {
        const nextInput = inputList[i + 1]
        if (this.isLabel(nextInput)) {
          this.specList.push(new Spec(curInput.substr(1), ''))
        } else {
          this.specList.push(new Spec(curInput.substr(1), inputList[++i]))
        }
      }
    }
  }
  getValue(label: string): any {
    return this.specList.find(item => item.label === label).value;
  }
  isLabel(val: string) {
    return /^-[a-zA-Z]+/.test(val)
  }
}

export class Schema {
  specList: Spec[]
  constructor(schema: string) {
    this.specList = schema.split(' ').map(item => {
      let tmp = item.split(':')
      return new Spec(tmp[0], tmp[1])
    })
  }

  of(label: string): Spec {
    const res: Spec = this.specList.find(item => item.label === label)
    if (res) {
      return res
    }
    throw new Error(`${label} is not exist`)
  }

  size(): number {
    return this.specList.length
  }
}

export class Args {

  schema: Schema
  params: Params
  constructor(schema: Schema, stringValue: string) {
    this.schema = schema
    this.params = new Params(stringValue)
  }

  getValue(label: string): any {
    const spec: Spec = this.schema.of(label)
    const value: string = this.params.getValue(label)
    switch (spec.getExpectedType()) {
      case 'boolean':
        return this.getBoolean(value)
      case 'number':
        return this.getNumber(value)
      case 'string':
        return this.getString(value)
    }
  }
  getBoolean(value: string): boolean {
    return value === 'false' ? false : true
  }
  getNumber(value: string): number {
    return parseInt(value, 10)
  }
  getString(value: string): string {
    return value
  }
}