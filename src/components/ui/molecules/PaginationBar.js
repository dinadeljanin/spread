import React from 'react'

import { cover, transparentize } from 'polished'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'

import left from '../../../assets/svg/chevron-left.svg'
import right from '../../../assets/svg/chevron-right.svg'

const Wrap = styled(ReactPaginate)`
  width: fit-content;
  margin: 0 auto;
  align-self: end;
  height: 30px;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  li {
    list-style-type: none;
    padding: 0;
    position: relative;
    height: 23px;
    width: 23px;
    cursor: pointer;
    a[role='button'] {
      ${cover}
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      text-align: center;
      line-height: 23px;
    }
  }
  .next, .previous {
    border-radius: 50%;
    border: 2px solid #000;
    background-color: #fff;
    height: 25px;
    width: 25px;
    background-size: 90%;
    background-position: center;
  }
  .next {
    margin-left: 1em;
    background-image: url(${right});
  }
  .previous {
    margin-right: 1em;
    background-image: url(${left});
  }
  .active {
    height: 23px;
    width: 23px;
    a {
      border-radius: 50%;
      background-color: ${transparentize(0.9, '#000')};
      line-height: 25px;
    }
  }
`

const PaginationBar = ({ pageCount, handleClick }) => {
  return (
    <Wrap
      activeClassName='active'
      nextLabel=''
      onPageChange={handleClick}
      pageCount={pageCount}
      pageRangeDisplayed={5}
      previousLabel=''
      renderOnZeroPageCount={null}
    />
  )
}

export default PaginationBar
