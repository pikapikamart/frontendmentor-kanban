import { Theme } from "../base";


export const rem = ( pixel: number) =>{
  const quotient = pixel / 16;

  return `${quotient}rem`;
}

export const fluid = ( min: number, pref: number, max: number ) =>{

  return `clamp(${rem(min)}, ${pref + "vw"}, ${rem(max)})`;
} 

type BreakpointSize = "tablet" | "desktop" | number;

export const breakpoint = (size: BreakpointSize, css: string) =>{

  switch(size) {
    case "tablet":
      return `
        @media (min-width: ${rem(Theme.breakpoints.tablet) }) {
          ${css}
        }
      `
    case "desktop":
      return `
        @media (min-width: ${rem(Theme.breakpoints.desktop) }) {
          ${css}
        }
      `
    default:
      return `
        @media (min-width: ${rem(size) }) {
          ${css}
        }
      `
  } 
}

export const customBreakpoint = ( size: number, css: string ) => {
  return `@media (min-width: ${ rem(size) }) {
    ${ css }
  }`
} 

export const maxBreakpoint = ( size: number, css: string ) => {
  
  return `
    @media (max-width: ${rem(size) }) {
      ${css}
    }
  `
}