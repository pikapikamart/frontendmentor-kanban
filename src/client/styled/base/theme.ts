import { DefaultTheme } from "styled-components";


export const theme: DefaultTheme = {
  colors: {
    body: "#F4F7FD",
    header: "#FFFFFF",
    warning: "#EA5555",
    warningHover: "#FF9898",
    button: {
      main: "#635FC7",
      mainHover: "#A8A4FF",
      secondary: "rgba(99, 95, 199, .1)",
      secondaryHover: "rgba(99, 95, 109, .25)",
      warning: "#EA5555",
      warningHover: "#FF9898", 
    },
    form: {
      background: "#FFFFFF",
      heading: "#000112",
      label: "#828FA3",
      input: "#000112"
    },
    boardHeading: "#000112",
    navlinks: "#828FA3",
    taskTitle: "#000112",
    subtask: "#000112",
    subtaskDone: "rgba(0, 1, 18, .5)",
    status: "#000112",
    navboard: "#FFFFFF",
    boardCurrent: "#FFFFFF",
    colorSchemeInput: "#635FC7",
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
    button: {
      ...theme.colors.button,
      secondary: "#FFFFFF",
      secondaryHover: "#FFFFFF"
    },
    form: {
      background: "#2B2C37",
      heading: "#FFFFFF",
      label: "#FFFFFF",
      input: "#FFFFFF"
    },
    boardHeading: "#FFFFFF",
  }
}