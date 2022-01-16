import React, { useContext, useState, useEffect } from 'react'

import styled from 'styled-components'

import { EthProvider } from '../../context'
import { Label } from '../ui/atoms/Cells'
import Loader from '../ui/atoms/Loader'
import BetItem from '../ui/molecules/BetItem'
import BetPlaceHolder from '../ui/molecules/BetPlaceholder'
import PaginationBar from '../ui/molecules/PaginationBar'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 95%;
`

const Container = styled.div`
  margin: 0 auto;
  justify-self: stretch;
  flex-grow: 1;
  height: fit-content;
  > :first-child { margin-top: 0; }
`

const Header = styled.div`
  width: 100%;
  height: fit-content;
  padding: 1em 1.5em;
  display: flex;
  flex-direction: row;
`

const Bets = ({ bets }) => {
  const betsPerPage = 6
  const { provider } = useContext(EthProvider)
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [betOffset, setItemOffset] = useState(0)

  const headerCells = ['Token', 'Market', 'Target Price', 'Settle Date', 'Sentiment', 'Wager', 'Creator', 'Challenger']

  useEffect(() => {
    const endOffset = betOffset + betsPerPage
    setCurrentItems(bets.slice(betOffset, endOffset))
    setPageCount(Math.ceil(bets.length / betsPerPage))
  }, [betOffset, bets])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * betsPerPage) % bets.length
    setItemOffset(newOffset)
  }

  const renderSwitch = () => {
    switch (true) {
      case provider && bets.length === 0:
        return <BetPlaceHolder />
      case provider && bets.length > 0:
        return (
          <Wrap>
            <Header>
              {headerCells.map((cell) => <Label key={`${cell} Label`} label={cell} />)}
            </Header>
            <Container>
              {currentItems && currentItems.map((bet, idx) =>
                <BetItem bet={bet} key={`bet no. ${idx + 1}`} path={idx + betOffset} />)
              }
            </Container>
            <PaginationBar handleClick={handlePageClick} pageCount={pageCount} />
          </Wrap>
        )
      case !provider:
      default:
        return <Loader height={'100%'} />
    }
  }

  return (
    <section>
      <h1>Bets</h1>
      {renderSwitch()}
    </section>
  )
}

export default Bets
