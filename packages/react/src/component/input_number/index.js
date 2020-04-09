import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Big from 'big.js'

class InputNumber extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: this.processValue(props.value),
    }
  }

  processValue = (value) => {
    if (value === null) {
      return ''
    }
    return value + ''
  }

  processOutValue = (value) => {
    if (value === '') {
      return null
    }
    return parseFloat(value)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value === null) {
      return { value: '' }
    }

    if (parseFloat(nextProps.value) !== parseFloat(prevState.value)) {
      return {
        value: nextProps.value + '',
      }
    }

    // 不需要更新状态，返回null
    return null
  }

  checkValue = (value) => {
    const { max, min, precision } = this.props

    const v = Number(value)
    if (max !== undefined && v > max) {
      return false
    }
    if (min !== undefined && v < min) {
      return false
    }

    if (
      parseInt(Big(value).times(Math.pow(10, precision))) !==
      +Big(value).times(Math.pow(10, precision))
    ) {
      return false
    }

    return true
  }

  handleChange = (e) => {
    // onInput 可以提供一个规范的数字
    let nV = e.target.value

    const { onChange } = this.props

    if (_.isNaN(Number(nV))) {
      nV = ''
    }

    // 到此是一个正常的数字了

    // 建议不通过，啥也不做
    if (nV !== '' && !this.checkValue(nV)) {
      return
    }

    this.setState({
      value: nV,
    })

    onChange(this.processOutValue(nV))
  }

  render() {
    const { value, onChange, max, min, precision, ...rest } = this.props

    return (
      <input
        {...rest}
        type='number'
        value={this.state.value}
        onChange={this.handleChange}
      />
    )
  }
}

InputNumber.propTypes = {
  /** value为null时，展示为'' */
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  /** 精确度，保留几位小数, 默认为2 */
  precision: PropTypes.number,
}

InputNumber.defaultProps = {
  precision: 2,
}

export default InputNumber
