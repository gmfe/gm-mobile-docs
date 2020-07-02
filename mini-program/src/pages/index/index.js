import React, { Component } from 'react'
import queryString from 'query-string'
import _ from 'lodash'
import {
  Text,
  PageMP,
  Cells,
  Cell,
  ActionSheet,
} from '../../../../packages/mp/src'

// 不知道为啥，要写到 component
const mpReq = require.context(
  '../../../../packages/mp/src/component/',
  true,
  /stories\.js$/
)
const comReq = require.context(
  '../../../../packages/components/src/component/',
  true,
  /stories\.js$/
)
const qrCodeReq = require.context(
  '../../../../packages/qrcode/',
  true,
  /stories\.js$/
)

const businessComReq = require.context(
  '../../../../packages/business-components/src/component/',
  true,
  /stories\.js$/
)

const cookieReq = require.context(
  '../../../../packages/cookie/',
  true,
  /stories\.js$/
)

const serviceTimeReq = require.context(
  '../../../../packages/service-time/src/component',
  true,
  /stories\.js$/
)

const storiesList = []

_.each(comReq.keys(), (key) => {
  storiesList.push({
    module: comReq(key),
    packageName: 'components',
    path: key,
  })
})

_.each(mpReq.keys(), (key) => {
  storiesList.push({
    module: mpReq(key),
    packageName: 'mp',
    path: key,
  })
})

_.each(qrCodeReq.keys(), (key) => {
  storiesList.push({
    module: qrCodeReq(key),
    packageName: 'qrcode',
    path: key,
  })
})

_.each(businessComReq.keys(), (key) => {
  storiesList.push({
    module: businessComReq(key),
    packageName: 'business-components',
    path: key,
  })
})

_.each(cookieReq.keys(), (key) => {
  storiesList.push({
    module: cookieReq(key),
    packageName: 'cookie',
    path: key,
  })
})

_.each(serviceTimeReq.keys(), (key) => {
  storiesList.push({
    module: serviceTimeReq(key),
    packageName: 'service-time',
    path: key,
  })
})

const dataMap = {}

_.each(storiesList, ({ module, packageName, path }) => {
  // 算是个常规的 stories
  if (module.default && module.default.title) {
    const title = module.default.title
    const root = title.includes('/') ? title.split('/')[0] : 'Other'
    const component = title.split('/').slice(-1)[0]

    dataMap[root] = dataMap[root] || {}
    dataMap[root][component] = {}

    _.each(module, (value, key) => {
      if (key !== 'default') {
        dataMap[root][component][key] = {
          packageName,
          root,
          component,
          store: key,
          folder: path.split('.')[1].split('/')[1],
        }
      }
    })
  }
})

export default class Index extends Component {
  render() {
    return (
      <PageMP>
        {_.map(dataMap, (oneValue, oneKey) => {
          return (
            <Cells key={oneKey} title={oneKey}>
              {_.map(oneValue, (twoValue, twoKey) => {
                return (
                  <Cell
                    access
                    key={twoKey}
                    onClick={() => {
                      ActionSheet.render({
                        data: _.map(twoValue, (v, k) => ({
                          value: v,
                          text: k,
                        })),
                      }).then((value) => {
                        wx.navigateTo({
                          url: `/pages_a/stories/index?${queryString.stringify(
                            value
                          )}`,
                        })
                      })
                    }}
                  >
                    <Text>{twoKey}</Text>
                  </Cell>
                )
              })}
            </Cells>
          )
        })}
      </PageMP>
    )
  }
}