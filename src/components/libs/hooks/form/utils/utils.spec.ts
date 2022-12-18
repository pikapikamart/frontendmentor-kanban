/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import { addFieldErrors, checkFieldForError, removeFieldErrors } from "./util"

describe("useFormValidation utilies", () =>{

  describe("checkForError utility", () =>{
    
    describe("input does not have aria-required", () =>{

      test("return false for not invalid input", () =>{
        const inputElement = document.createElement("input")
      
        expect(checkFieldForError(inputElement)).toBeFalsy()
      })
    })

    describe("input does have aria-required", () => {

      test("return false when input has value", () =>{
        const inputElement = Object.assign(document.createElement("input"), {
          value: "testValue"
        })
        inputElement.setAttribute("aria-required", "true")

        expect(checkFieldForError(inputElement)).toBeFalsy()
      })

      test("return true when input does not have value", () =>{
        const inputElement = Object.assign(document.createElement("input"), {
          value: ""
        })
        inputElement.setAttribute("aria-required", "true")

        expect(checkFieldForError(inputElement)).toBeTruthy()
      })
    })
  })

  describe("addFieldErrors utility", () =>{

    test("add aria-invalid attribute to input", () =>{
      const inputElement = document.createElement("input")
      addFieldErrors(inputElement)

      expect(inputElement).toHaveAttribute("aria-invalid", "true")
    })
  })

  describe("removeFieldErrors utility", () =>{
    
    test("remove aria-invalid from input", () =>{
      const inputElement = document.createElement("input")
      inputElement.setAttribute("aria-invalid", "true")
      removeFieldErrors(inputElement)

      expect(inputElement).not.toHaveAttribute("aria-invalid")
    })
  })
})