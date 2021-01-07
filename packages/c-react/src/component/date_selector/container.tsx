import React, { FC } from 'react'
import { View } from '../view'
import { Flex } from '../flex'
import moment from 'moment'
import _ from 'lodash'

import { ContainerProps } from './types'
import Day from './day'

const WEEK_COUNT = 7

const Container: FC<ContainerProps> = ({ min, max, selected, ...rest }) => {
  // 方便下面循环计算，多减去一天
  const start = moment(min).weekday(0).add(-1, 'day').startOf('day')
  // 计算相隔几周，加上头尾两天 + 多减去的一天
  const cycleWeeks =
    (moment(max).weekday(6).diff(start, 'days') + 3) / WEEK_COUNT
  const _selected = selected.sort((a, b) => +a - +b)

  return (
    <View className='m-date-selector-content'>
      {_.times(cycleWeeks, (index: number) => {
        return (
          <Flex none key={index}>
            {_.times(WEEK_COUNT, () => {
              return (
                <Day
                  key={start.format('YYYY-MM-DD')}
                  {...rest}
                  min={min}
                  max={max}
                  currentDate={start.add(1, 'day').toDate()}
                  selected={_selected}
                />
              )
            })}
          </Flex>
        )
      })}
    </View>
  )
}

export default Container
