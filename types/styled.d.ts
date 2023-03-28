import "styled-components";


declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      warning: string,
      warningHober: string,
      buttonMain: string,
      buttonMainHover: string,
      buttonSecondary: string,
      buttonSecondaryHover: string,
      light: string,
      light2: string,
      lightBlue: string,
      lightBlueChanging: string,
      lightBlue2: string,
      darkBlue: string,
      darkBlue2: string,
      dark: string,
      dark2: string
    },
    fontSize: {
      headingXL: number,
      headingL: number,
      headingM: number,
      headingS: number
    },
    breakpoints: {
      tablet: number,
      desktop: number
    }
  }
}