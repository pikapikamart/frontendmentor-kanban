import "styled-components";


declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      body: string,
      header: string,
      
      warning: string,
      warningHover: string,
      button: {
        main: string,
        mainHover: string,
        secondary: string,
        secondaryHover: string,
        warning: string,
        warningHover: string
      },
      boardHeading: string,
      navlinks: string,
      taskTitle: string,
      subtask: string,
      subtaskDone: string,
      status: string,
      navboard: string,
      boardCurrent: string,
      colorSchemeInput: string,
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