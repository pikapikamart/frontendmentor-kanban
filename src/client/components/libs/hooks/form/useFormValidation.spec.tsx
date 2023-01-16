/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import { renderHook } from "@testing-library/react"
import { useFormValidation } from "./useFormValidation"


describe("useFormValidation hook", () =>{
  
  test("accepts an object of input names", () =>{
    const {} = renderHook(() => useFormValidation({
      email: "",
      password: ""
    }))
  })

  describe("form submitted", () =>{

    describe("form have invalid fields", () =>{

      test("renders component", () =>{
        const { result: { current } } = renderHook(() => useFormValidation({
          firstname: "",
          lastname: ""
        }))

      })
    })
  })
})