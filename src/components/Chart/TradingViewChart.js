import React, { useRef, useState, useEffect } from 'react'

import { i18n } from 'dateformat'
import { createChart, LastPriceAnimationMode, CrosshairMode } from 'lightweight-charts'
import Numeral from 'numeral'

import { formatAreaSeriesData } from '../../utils'
import Popper from '../ui/atoms/Popper'

const { monthNames } = i18n

const TradingViewChart = ({ heightRef, chartWrap, prices, color }) => {
  const containerRef = useRef()
  const chartRef = useRef()
  const popperRef = useRef()

  const [chartCreated, setChartCreated] = useState(false)

  useEffect(() => {
    if (!chartCreated && prices) {
      chartRef.current = createChart(containerRef.current, {
        height: chartWrap.current.clientHeight,
        width: chartWrap.current.clientWidth,
        layout: {
          backgroundColor: 'transparent',
          textColor: '#000000',
          fontSize: 12,
          fontFamily: 'Open Sauce Sans Regular'
        },
        crosshair: {
          mode: CrosshairMode.Magnet,
          color: 'black',
          visible: false,
          vertLine: {
            color: 'black',
            width: 2,
            style: 0,
            visible: true,
            labelVisible: false
          },
          horzLine: {
            color: 'black',
            width: 2,
            style: 0,
            visible: true,
            labelVisible: true
          }
        },
        priceScale: { borderVisible: false },
        timeScale: { borderVisible: false },
        grid: {
          vertLines: { visible: false },
          horzLines: { visible: false }
        },
        localization: {
          dateFormat: 'MMM dd \'yy',
          priceFormatter: (val) => Numeral(val).format('$0,0.00'),
          priceScale: { borderVisible: false }
        }
      })
      const areaSeries = chartRef.current.addAreaSeries({
        topColor: `${color}BF`,
        bottomColor: `${color}40`,
        lineColor: `${color}`,
        lastPriceAnimation: LastPriceAnimationMode.Continuous,
        crosshairMarkerBackgroundColor: 'white',
        crosshairMarkerBorderColor: 'black',
        priceLineWidth: 2,
        priceLineStyle: 0
      })

      const formatData = formatAreaSeriesData(prices)

      areaSeries.setData(formatData)

      chartRef.current.subscribeCrosshairMove(function (param) {
        if (
          !param.time ||
          param.point.x < 0 ||
          param.point.x > chartWrap.current.clientWidth ||
          param.point.y < 0 ||
          param.point.y > chartWrap.current.clientHeight
        ) {
          popperRef.current.style.display = 'none'
        } else {
          const { time, point, seriesPrices } = param
          const { x, y } = point
          const { month, day, year } = time
          const date = `${monthNames[month - 1]} ${day} '${year.toString().slice(-2)}`
          const price = Numeral(seriesPrices.get(areaSeries)).format('$0,0.00')

          popperRef.current.innerHTML = `
            <div>
              <p id="time">${date}</p>
              <p id="price">${price}</p>
            </div>
          `
          popperRef.current.style.display = 'block'
          popperRef.current.style.top = `${y}px`
          popperRef.current.style.left = `${x}px`
        }
      })
    }

    setChartCreated(true)
  }, [prices, chartCreated, heightRef, chartWrap, color])

  useEffect(() => {
    chartWrap.current = new ResizeObserver((entries) => {
      let { width, height } = entries[0].contentRect
      width -= 1
      chartRef.current.applyOptions({ width, height })
      chartRef.current.timeScale().getVisibleLogicalRange()
    })

    chartWrap.current.observe(containerRef.current)

    return () => chartWrap?.current && chartWrap.current.disconnect()
  }, [chartWrap])

  return (
    <>
      <Popper reference={popperRef} />
      <div ref={containerRef} />
    </>
  )
}

export default TradingViewChart
