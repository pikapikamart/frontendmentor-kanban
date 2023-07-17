import { trpc } from "@/client/lib/trpc"
import { AppProps } from "next/app"
import { ThemeProvider } from "styled-components"
import { 
  Theme,
  DarkTheme } from "@/client/styled/base"
import { NextPage } from "next"
import { DefaultLayout } from "@/client/components/layout/default"
import { 
  Provider, 
  useDispatch, 
  useTrackedState } from "@/store"
import { useEffect } from "react"


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: ( page: React.ReactElement ) => React.ReactNode,
  requireAuth?: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ( (page) => DefaultLayout(page) )

  return (
    <Provider>
      <ThemedApp>
        { getLayout(<Component { ...pageProps } />) }
      </ThemedApp>
    </Provider>
  )
}

type ThemedAppProps = {
  children: React.ReactNode
}

const ThemedApp = ({ children }: ThemedAppProps) => {
  const { darkmode } = useTrackedState()
  const dispatch = useDispatch()

  useEffect(() =>{
    if ( typeof window !=="undefined" ) {
      const darkmode = window.localStorage.getItem("darkmode") || ""

      if ( darkmode ) {
        dispatch({
          type: "DARKMODE",
          payload: JSON.parse(darkmode)
        })
      }
    }
  },[])

  return (
    <ThemeProvider theme={ darkmode? DarkTheme : Theme  }>
      { children }
    </ThemeProvider>
  )
}


export default trpc.withTRPC(App)