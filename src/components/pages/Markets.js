import React from 'react'

import styled from 'styled-components'

import { TOKEN_PAIRS } from '../../constants/TokenPairs'
import MarketPair from '../ui/molecules/MarketPair'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    width: 100%;
  }
  @media (max-width: 500px) {
    h1 {
      width: 260px;
    }
  }
`

const Container = styled.div`
  display: grid;
  overflow: scroll;
  height: fit-content;
  grid-gap: 1em;
  width: fit-content;
  margin: 1em auto;
  grid-template-columns: repeat(1, auto);
    @media (min-width: 500px) {
    grid-template-columns: repeat(2, auto);
    margin: 2em auto;
  }
  @media (min-width: 750px) {
    grid-template-columns: repeat(3, auto);
    margin: 2em auto;
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(4, auto);
    margin: 2em auto;
  }
  @media (min-width: 1600px) {
    grid-template-columns: repeat(5, auto);
  }
`

const Markets = () => {
  return (
    <Section>
      <h1>Markets</h1>
      <Container>
        {Object.entries(TOKEN_PAIRS).map(([pair, pairData]) =>
          <MarketPair key={`${pair} Button`}
           pairData={pairData} />
        )}
      </Container>
    </Section>
  )
}

export default Markets
