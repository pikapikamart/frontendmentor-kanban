import "styled-components";


declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: {
      tablet: number,
      desktop: number
    }
  }
}