export * from '@testing-library/react'
import { render } from "@testing-library/react";


type ProviderProps = {
  children: React.ReactNode
}

const Provider = ({ children }: ProviderProps) => {

  return (
    <>
      { children }
    </>
  )
}

const customRender = ( ui: React.ReactElement, options = {} ) =>{
  render(ui, {
    wrapper: Provider,
    ...options
  })
}

export { customRender as render }