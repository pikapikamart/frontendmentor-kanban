/**
 * @jest-environment jsdom
 */
import { renderHook } from "@testing-library/react"
import { useFormValidation } from "./useFormValidation"


describe("useFormValidation hook", () =>{
  
  test("accepts an object of input names", () =>{
    const {} = renderHook(() => useFormValidation({
      email: "",
      password: ""
    }))
  })
  
})