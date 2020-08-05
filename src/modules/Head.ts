import { Title, createTitle } from "./Title"

export interface Head {
  title: Title
}

export function setHead(head: string) {
  return `<head>${head}</head>`
}

export function createHead(head: string, data: Head) {
  for (const headComponent in data) {
    switch (headComponent) {
      case "title": {
        head = createTitle(head, data.title)
        break
      }
    }
  }
  return setHead(head)
}
