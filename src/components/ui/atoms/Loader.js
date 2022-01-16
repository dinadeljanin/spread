import React from 'react'

import { darken } from 'polished'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loader = ({ height = null }) => {
  return (
    <SkeletonTheme
      baseColor={darken(0.04, '#fff')}
      highlightColor={darken(0.08, '#fff')}>
      <Skeleton height={height} />
    </SkeletonTheme>
  )
}

export default Loader
