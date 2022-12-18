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

export const customRender = ( ui: React.ReactElement, options = {} ) =>{
  render(ui, {
    wrapper: Provider,
    ...options
  })
}