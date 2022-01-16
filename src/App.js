import React, { useContext, useEffect } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Bet from './components/pages/Bet'
import Bets from './components/pages/Bets'
import Markets from './components/pages/Markets'
import PlaceBet from './components/pages/PlaceBet'
import UserAccount from './components/pages/UserAccount'
import Layout from './components/ui/templates/Layout'
import { TOKEN_PAIRS } from './constants/TokenPairs'
import { EthProvider } from './context'
import GlobalStyles from './theme/GlobalStyles'

const App = () => {
  const { contracts, dispatch, provider, betState, user } = useContext(EthProvider)
  const { bets } = betState
  const { address } = user
  const { spread } = contracts

  useEffect(() => {
    (async () => {
      try {
        const bets = await spread.fetchBets()
        dispatch({ type: 'SET_BETS', payload: bets })
      } catch {
        dispatch({ type: 'SET_BETS', payload: [] })
      }
    })()
  }, [dispatch, spread])

  return (
    <>
    <GlobalStyles />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route element={ <Markets /> } exact path='/' />
            <Route element={ <Bets bets={bets} /> } path='/bets' />
            <Route element={ <UserAccount /> } path={`/${address}`} />
            {Object.entries(TOKEN_PAIRS).map(([pair, pairData], idx) =>
              <Route
                element={
                  <PlaceBet
                    pair={pair}
                    pairData={pairData}
                  />}
                key={idx}
                path={`/${pair}`}
              />
            )}
            {provider && bets.length > 0 && bets.map((bet, idx) =>
              <Route
                element={<Bet bet={bet} betIndex={idx} />}
                key={`Bet no. ${idx}`}
                path={`/${idx}`}
              />
            )}
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
