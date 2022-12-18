/**
 * @jest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react"
import { useFormValidation } from "./useFormValidation"


describe("use form validation", () =>{

  test("hook returns an object", () =>{
    const { result } = renderHook(() => useFormValidation())

    expect(result.current.valid).toBeFalsy()

    act(() =>{
      result.current.setValid(true)
    })

    expect(result.current.valid).toBeTruthy()
  })
})