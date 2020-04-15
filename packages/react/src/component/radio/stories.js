import React from 'react'
import { observable } from 'mobx'

import Radio from './'

const store = {
  checked: true,
  setChecked(v) {
    this.checked = v
  },
}
const store1 = observable(store)
const store2 = observable({ ...store, checked: false })

export const Normal = () => (
  <div>
    checked true
    <div>
      <Radio checked={store1.checked}>
        选择
      </Radio>
    </div>
    checked false
    <div>
      <Radio checked={store2.checked}>
        选择
      </Radio>
    </div>
    disabled
    <div>
      <Radio className='m-text-16' checked disabled>
        选择
      </Radio>
      <Radio className='m-text-16' checked={false} disabled>
        选择
      </Radio>
    </div>
  </div>
)

export default {
  title: 'Radio',
}