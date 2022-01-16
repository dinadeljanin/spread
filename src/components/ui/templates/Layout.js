import React from 'react'

import Footer from '../organisms/Footer'
import Header from '../organisms/Header'
import Nav from '../organisms/Nav'
import Network from '../templates/modals/Network'
import Onboarding from '../templates/modals/Onboarding'
import Transaction from '../templates/modals/Transaction'

const Layout = ({ children }) => {
  return (
    <>
      <Onboarding />
      <Network />
      <Transaction />
      <Header />
      <Nav />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
