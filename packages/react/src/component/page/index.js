import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Flex from '../flex'
import KeyboardBox from '../keyboard/box'

const Page = ({
  className,
  pageClassName,
  white,
  header,
  tabbar,
  top,
  bottom,
  children,
  ...rest
}) => {
  return (
    <Flex
      {...rest}
      column
      className={classNames(
        'm-page',
        {
          'm-page-white': white,
        },
        className
      )}
    >
      {header && (
        <Flex column none className='m-page-header m-flex-none'>
          {header}
        </Flex>
      )}
      {top && <div className='m-flex-none'>{top}</div>}
      <div className={classNames('m-page-content', pageClassName)}>
        {children}
      </div>
      {bottom && <div className='m-flex-none'>{bottom}</div>}
      {tabbar && <div className='m-page-tabbar m-flex-none'>{tabbar}</div>}
      <KeyboardBox tabbar={!!tabbar} />
    </Flex>
  )
}

Page.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  pageClassName: PropTypes.string,
  white: PropTypes.bool,
  header: PropTypes.node,
  tabbar: PropTypes.node,
  top: PropTypes.node,
  bottom: PropTypes.node,
}

export default Page
