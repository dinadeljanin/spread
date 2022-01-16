import React, { useEffect, useState, useRef } from 'react'

import styled from 'styled-components'

import TradingViewChart from './TradingViewChart'

import { wrap } from '../../theme/Snippets'
import { getUrl } from '../../utils'
import Loader from '../ui/atoms/Loader'

const Wrap = styled.div`
  ${wrap}
  grid-area: chart;
  overflow: hidden;
  width: 100%;
  height: 490px;
  position: relative;
  border-radius: 15px;
`

const ChartContainer = styled.div`
  overflow: hidden;
  width: 100%;
  cursor: grab;
  height: 100%;
`

const Chart = ({ apiId, color }) => {
  const containerRef = useRef()
  const wrapRef = useRef()
  const [areaSeriesData, setAreaSeriesData] = useState(null)
  const [coinGeckoStatus, setCoinGeckoStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/ping')
        if (!response.ok) {
          const message = `We're not going to the moon because ${response.status}`
          throw new Error(message)
        }
        setCoinGeckoStatus(true)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const url = getUrl(apiId)
        console.log(url)
        const response = await fetch(url)
        if (!response.ok) {
          const message = "Couldn't load data"
          throw new Error(message)
        }
        const data = await response.json()
        const { prices } = data
        setIsLoading(false)
        setAreaSeriesData(prices)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [coinGeckoStatus, apiId])

  return (
      <Wrap ref={wrapRef}>
        <ChartContainer ref={containerRef}>
          {!isLoading && areaSeriesData
            ? <TradingViewChart
                chartWrap={containerRef}
                color={color}
                heightRef={wrapRef}
                isLoading={isLoading}
                prices={areaSeriesData} />
            : <Loader height={'100%'} />
          }
        </ChartContainer>
      </Wrap>
  )
}

export default Chart
