import _ from 'lodash'

// 数字键类型定义
const TYPE = {
  DOT: 'dot',
  BACK: 'back',
  NUMBER: 'number',
}

const KEYS = [
  { type: TYPE.NUMBER, value: '1' },
  { type: TYPE.NUMBER, value: '2' },
  { type: TYPE.NUMBER, value: '3' },
  { type: TYPE.NUMBER, value: '4' },
  { type: TYPE.NUMBER, value: '5' },
  { type: TYPE.NUMBER, value: '6' },
  { type: TYPE.NUMBER, value: '7' },
  { type: TYPE.NUMBER, value: '8' },
  { type: TYPE.NUMBER, value: '9' },
  { type: TYPE.DOT, value: '.' },
  { type: TYPE.NUMBER, value: '0' },
]

const text2Number = (value) => {
  if (value === '') {
    return ''
  }
  return _.isNaN(parseFloat(value)) ? '' : parseFloat(value)
}

const isContains = (target, fun) => {
  let node = target
  while (node) {
    if (fun(node)) {
      return true
    }
    node = node.parentNode
  }
  return false
}

export { TYPE, KEYS, text2Number, isContains }
