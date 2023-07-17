import { DefaultTheme } from "styled-components";


export const theme: DefaultTheme = {
  colors: {
    body: "#F4F7FD",
    header: "#FFFFFF",
    warning: "#EA5555",
    outline: "#635FC7",
    heading: {
      default: "#000112"
    },
    button: {
      main: "#635FC7",
      mainHover: "#A8A4FF",
      secondary: "#635FC710",
      secondaryHover: "rgba(99, 95, 109, .25)",
      warning: "#EA5555",
      warningHover: "#FF9898"
    },
    form: {
      background: "#FFFFFF",
      label: "#828FA3",
      input: "#000112"
    },
    border: "#E4EBFA",
    navlinks: "#828FA3",
    navlinksHover: "#635FC710",
    boardDropdown: "#FFFFFF",
    columnAddition: "#E9EFFA",
    columnAdditionHover: "#635FC7",
    default: "#828FA3"
  },
  fontSize: {
    headingXL: 24,
    headingL: 18,
    headingM: 15,
    headingS: 12
  },
  breakpoints: {
    tablet: 768,
    desktop: 1000
  }
}

export const darkTheme: DefaultTheme = {
  ...theme,
  colors:{
    ...theme.colors,
    body: "#20212C",
    header: "#2B2C37",
    outline: "#FFFFFF",
    heading: {
      default: "#FFFFFF"
    },
    button: {
      ...theme.colors.button,
      secondary: "#FFFFFF",
      secondaryHover: "#FFFFFF"
    },
    form: {
      background: "#2B2C37",
      label: "#FFFFFF",
      input: "#FFFFFF"
    },
    border: "#3E3F4E",
    navlinksHover: "#FFFFFF",
    boardDropdown: "#20212C",
    columnAddition: "#2B2C3725"
  }
}