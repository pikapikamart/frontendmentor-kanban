import "styled-components";


declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      body: string,
      header: string,
      warning: string,
      outline: string,
      heading: {
        default: string
      },
      button: {
        main: string,
        mainHover: string,
        secondary: string,
        secondaryHover: string,
        warning: string,
      },
      form: {
        background: string,
        label: string,
        input: string
      },
      border: string,
      navlinks: string,
      boardDropdown: string,
      columnAddition: string,
      default: string
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