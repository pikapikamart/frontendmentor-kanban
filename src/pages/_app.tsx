import { trpc } from "@/client/lib/trpc"
import { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "styled-components"
import { Theme } from "@/client/styled/base"
import { NextPage } from "next"
import { DefaultLayout } from "@/client/components/layout/default"
import { Provider } from "@/store"


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
      <SessionProvider session={ pageProps.session }>
        <ThemeProvider theme={ Theme }>
          { getLayout(<Component { ...pageProps } />) }
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  )
}


export default trpc.withTRPC(App)