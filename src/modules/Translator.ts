import { JSDOM } from "jsdom"
import { Jason } from "./components/Jason"
import { Head } from "./components/Head"
import { Title } from "./components/Title"

// Functions for iterating through data
export function enumHTML(data: Jason) {
  const dom = new JSDOM(`<!DOCTYPE html>`)
  for (const component in data) {
    switch (component) {
      case "head":
        enumHead(
          dom,
          dom.window.document.getElementsByTagName("head")[0],
          data.head
        )
        break
    }
  }
  return dom
}

function enumHead(dom: JSDOM, head: HTMLHeadElement, data: Head) {
  for (const headComponent in data) {
    switch (headComponent) {
      case "title": {
        enumTitle(dom, head, data.title)
        break
      }
    }
  }
}

function enumTitle(dom: JSDOM, head: HTMLHeadElement, title: Title) {
  if (title) {
    const titleELem = dom.window.document.createElement("title")
    titleELem.innerHTML = title.toString()
    head.appendChild(titleELem)
  }
}
