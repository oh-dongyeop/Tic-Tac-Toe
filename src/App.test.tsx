import React, { ReactElement } from "react"
import { unmountComponentAtNode, render } from "react-dom"
import { act } from "react-dom/test-utils"

import App from "./App"

let container: HTMLDivElement

beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
})

describe("Event Test", () => {
  it("When click a Box", () => {
    const app = render(<App/>,container)
    const box: NodeListOf<Element> = document.querySelectorAll(".Box")
    act(() => {
      box[0].dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    act(() => {
      box[3].dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    act(() => {
      box[2].dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    act(() => {
      box[4].dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    act(() => {
      box[1].dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
  })
})
