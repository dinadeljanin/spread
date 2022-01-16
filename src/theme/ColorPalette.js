import { lighten } from 'polished'

export const wrapStyles = `
  background-color: #2a292e;
  border: 2px solid ${lighten(0.05, '#2a292e')};
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

export const eerieBlack = '#18181a'
export const raisinBlack = '#2a292e'
export const flickrBlue = '#4162C8'

export const navyBlue = '#070a3a;'

// export const springGreen = '#dfef82'
export const springGreen = '#3aed7f'
export const lightenedAquamarine = lighten(0.15, '#dfef82')

// export const tartOrange = '#e26263'
export const tartOrange = '#FE4A4A'
export const lightenedCandyPink = lighten(0.15, '#e26263')

export const COLORS = { raisinBlack, eerieBlack, flickrBlue, springGreen, tartOrange }
