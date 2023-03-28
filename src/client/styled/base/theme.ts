import { DefaultTheme } from "styled-components";


export const theme: DefaultTheme = {
  colors: {
    warning: "#EA5555",
    warningHober: "#FF9898",
    buttonMain: "#635FC7",
    buttonMainHover: "#A8A4FF",
    buttonSecondary: "rgba(99, 95, 199, .1)",
    buttonSecondaryHover: "rgba(99, 95, 109, .25)",
    light: "#FFFFFF",
    light2: "#F4F7FD",
    lightBlue: "#828FA3",
    lightBlueChanging: "#828FA3",
    lightBlue2: "#E4EBFA",
    darkBlue: "#2B2C37",
    darkBlue2: "#3E3F4E",
    dark: "#000112",
    dark2: "#20212C"
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
    buttonSecondaryHover: "#FFFFFF",
    lightBlueChanging: "#FFFFFF",
    dark: "#FFFFFF"
  }
}