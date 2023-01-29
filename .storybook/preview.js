import { ThemeProvider } from "styled-components"
import { addDecorator } from "@storybook/react"
import { withThemes } from "@react-theming/storybook-addon"
import { GlobalStyle, Theme } from "../src/client/styled/base"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

addDecorator(withThemes(ThemeProvider, [ Theme ]))
addDecorator(s => <><GlobalStyle />{ s() }</>)