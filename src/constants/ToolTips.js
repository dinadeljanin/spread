import React from 'react'

import Link from '../components/ui/atoms/Link'

export const SpendLimit = () => {
  return (
    <>
      <p>
        Before you can place a bet, you&apos;ll need to grant permission for this smart contract to spend your DAI on your behalf.
      </p>
      <br />
      <p>
        The max button will populate the input field with your total balance of DAI. This could&apos;ve been unlimited, but I could be <Link link="https://twitter.com/PlutusCrypto/status/1403677670240628736" name="Best Tweet About Me Ever" >an awful person</Link> and this smart contract can be malicious and <Link link="https://twitter.com/bobbyong/status/1355516570332614662?lang=en" name='Unlimited Spend Limit Bad'>this tweet from Bobby Ong</Link> is worth a read.
      </p>
    </>
  )
}
