import { Head, createHead } from "./Head"
import { Body, createBody } from "./Body"

export interface Jason {
  head: Head
  body: Body
}

export function setHTML(HTML: string, head: string, body: string) {
  return HTML.concat(HTML, `<html>${head}${body}</html>`)
}

export function createHTML(
  head: string,
  body: string,
  data: Jason,
  HTML: string
) {
  for (const component in data) {
    switch (component) {
      case "head":
        head = createHead(head, data.head)
        break
      case "body":
        body = createBody(body, data.body)
        break
    }
  }
  return setHTML(HTML, head, body)
}
