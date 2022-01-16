import React from 'react'

import styled from 'styled-components'

import dedCat from '../../../assets/svg/ded-cat.svg'

const Wrap = styled.div`
  position: relative;
  height: 65vh;
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > img {
    margin-bottom: 1.5em;
    height: 100px;
    cursor: url(
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>👋</text></svg>"
      ) 16 0, auto;
  }
`

const BetPlaceholder = () => {
  return (
    <Wrap>
      <img
        alt="Dead Cat Bounce."
        src={dedCat}
        title="You know, a lot of people are saying I was deadcatting."/>
      <h3>No open bets at the moment.</h3>
    </Wrap>
  )
}

export default BetPlaceholder
