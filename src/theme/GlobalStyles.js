import { lighten, cover } from 'polished'
import { createGlobalStyle } from 'styled-components'

import { COLORS } from './ColorPalette'
import { boxSizing, wrap } from './Snippets'

import light from '../assets/fonts/open-sauce/OpenSauceSans-Light.ttf'
import regular from '../assets/fonts/open-sauce/OpenSauceSans-Regular.ttf'
import calendar from '../assets/svg/calendar.svg'
import left from '../assets/svg/chevron-left.svg'
import right from '../assets/svg/chevron-right.svg'

const { eerieBlack, raisinBlack } = COLORS

const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'Open Sauce Sans Regular';
    src: url(${regular});
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: 'Open Sauce Sans Light';
    src: url(${light});
    font-style: normal;
    font-weight: normal;
  }

  html {
    height: 100vh;

  }

  body {
    margin: 0;
    padding: 0;
    position: relative;
    background-color: #efefef;
    color: #000A;
    width: 100vw;
    height: 100%;
    #root {
      position: relative;
      width: 100vw;
      display: grid;
      height: 100%;
      overflow: scroll;
      grid-template-columns: 14vw auto;
      grid-template-rows: 80px auto 80px;
      gap: 0px 0px;
      grid-template-areas:
        "header header"
        "nav main"
        "footer footer";
      @media (min-width: 1500px) {
        grid-template-rows: 80px auto 80px;
        grid-template-columns: 14vw auto;
        justify-items: stretch;
      }
    }

  }

  header {
    align-items: center;
    display: flex;
    align-self: start;
    background-color: #ffdb59;
    grid-area: header;
    flex-direction: row;
    height: 80px;
    justify-content: space-between;
    width: 100%;
    padding: 0 0.75em;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 2px solid #000;
    > * { justify-self: end; }
    @media (min-width: 1200px) {
      padding: 0 2em;
      grid-template-columns: 14vw auto;
    }
  }

  footer {
    ${boxSizing}
    height: 80px;
    border-top: 2px solid #000;
    grid-area: footer;
    background-color: #fe5a58;
    width: 100%;
    align-self: flex-end;
    display: flex;
    padding: 0 2em;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > * { width: fit-content; }
    p > a { text-decoration: underline; }
    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    @media (min-width: 600px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  nav {
    height: 100%;
    justify-self: center;
    background-color: #49a6f9;
    opacity: 0.8;
    background-image: radial-gradient(#000000 1px, #49a6f9 1px);
    background-size: 17px 17px;
    align-self: stretch;
    grid-area: nav;
    width: 14vw;
    border-right: 2px solid #000;
    justify-self: center;
    align-self: stretch;
    @media (min-width: 1500px) {
      width: 14vw;
    }
  }

  main {
    grid-area: main;
    z-index: 10;
    width: 100%;
    justify-self: stretch;
    @media (min-width: 500px) {
      display: grid;
      place-items: center;
    }
  }

  section {
    ${boxSizing}
    padding-top: 1em;
    width: 100%;
    @media (min-width: 500px) {
      width: fit-content;
      align-self: stretch;
      height: 100%;
      padding-top: 2em;
      padding-bottom: 2em;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    // font-family: 'Open Sauce Sans Regular', sans-serif;
    font-family: antique-olive, sans-serif;
    font-weight: 400;
    font-style: normal;
    color: #${eerieBlack};
    margin: 0;
    &::selection {
      background-color: #000;
      color: #fff;
    }
  }

  h1 {
      font-size: 1.5em;
    @media (min-width: 1500px) {
      font-size: 2rem;
    }
   }

  h2 {
    font-size: 1.02rem;
    @media (min-width: 500px) {
      font-size: 1.602rem;
    }
  }

  h3 {font-size: 1.3rem;}

  h4 {font-size: 1.266rem;}

  h5 {font-size: 1.125rem;}

  p {
    // font-family: 'Open Sauce Sans Regular';
    font-family: antique-olive, sans-serif;
    font-weight: 400;
    padding: 0;
    color: ${eerieBlack};
    margin: 0;
    &::selection {
      background-color: ${eerieBlack};
      color: #fff;
    }
  }

  a {
    color: ${eerieBlack};
    font-family: antique-olive, sans-serif;
    text-decoration: none;
    &::selection {
      background-color: ${eerieBlack};
      color: #fff;
    }
  }

  span::selection {
    background-color: ${eerieBlack};
    color: #fff;
  }

  form {
    ${wrap}
    grid-area: form;
    border-radius: 15px;
    width: 100%;
    box-sizing: border-box;
    padding: 1em;
    height: fit-content;
    @media (min-width: 1300px) {
      width: 460px;
    }
  }

  legend {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: .25em 0 .5em;
    h2 {
      color: ${lighten(0.15, eerieBlack)};
    }
  }

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
    &:disabled {
      user-select: none;
    }
  }

  button {
    font-family: antique-olive, sans-serif;
    background-color: ${lighten(0.075, raisinBlack)};
    color: ${eerieBlack};
    font-size: 1em;
    &:disabled {
      cursor: not-allowed;
      user-select: none;
    }
  }

  label {
    display: flex;
    flex-direction: column;
    padding: 0.25em 0 0;
    font-family: 'Open Sauce Sans Regular';
    margin-top: 0.5em;
    position: relative;
    color: ${lighten(0.35, eerieBlack)};
  }

  input {
    width: calc(100% - 1em - 60px);
    margin: 1em 0;
    height: 40px;
    box-shadow: rgba(0, 0, 0, 5%) 0px 5px 10px inset;
    border-radius: 10px;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    padding-left: .5em;
    font-family: antique-olive, sans-serif;
    font-weight: 400;
    font-size: 1.1em;
    line-height: 25px;
    border: 2px solid ${lighten(0.075, eerieBlack)};
    background-color: #fff;
    transition: 0.2s;
    color: ${eerieBlack};
    &:focus { border: 2px solid ${lighten(0.15, eerieBlack)}; }
    &:disabled { cursor: not-allowed; user-select: none; }
    margin-top: 0.15em;
    padding-top: .05em;
    &::selection {
      background-color: ${eerieBlack};
      color: #fff;
    }
  }

  img { user-select: none; }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  input[type=number] { -moz-appearance: textfield; }

  .react-datepicker-popper[data-placement^=top] {
    padding-bottom: 0;
  }

  .react-datepicker__input-container {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 20%;
      background-image: url(${calendar});
      background-size: 60%;
      background-position: center;
      background-repeat: no-repeat;
      top: 2px;
      right: 2px;
    }
  }

  .react-datepicker {
    border-radius: 10px;
    border: 2px solid #000;
    overflow: hidden;
  }

  .react-datepicker__header {
    background-color: #fff;
    font-family: 'Open Sauce Sans Regular';
    padding: 1em 0;
    border-bottom: 2px solid #000;
    .react-datepicker__current-month {
      font-size: 1.25em;
    }
  }

  .react-datepicker__navigation {
    border: 1px solid #000;
    margin: 0.8em;
    border-radius: 50%;
    height: 17px;
    width: 17px;
    background-position: center;
    background-size: 90%;
    span {
      display: none;
    }
  }

  .react-datepicker__navigation--previous {
    background-image: url(${left});
  }

  .react-datepicker__navigation--next {
    background-image: url(${right});
  }

  .react-datepicker__day-names {
    margin-top: 0.45em;
    text-transform: uppercase;
    font-family: 'Open Sauce Sans Regular';
  }

  .react-datepicker__week {
    display: flex;
    align-items: center;

  }

  .react-datepicker__day {
    font-family: 'Open Sauce Sans Regular';
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    outline: 0;
    line-height: 24px;
    color: #000;
    background-color: #fe5a58;
    box-sizing: border-box;
    position: relative;
    &::before {
      ${cover}
      left: 0;
      top: 0;
      content: '';
      height: 100%;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
      border: 2px solid black;
    }
    &:hover {
      background-color: ${lighten(0.1, '#fe5a58')};
    }
  }
`

export default GlobalStyles
