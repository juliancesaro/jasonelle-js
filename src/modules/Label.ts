import { Item } from "./Item"

export interface Label extends String {}

export function setLabel(body: string, item: Item) {
  if (item.href) {
    return body.concat(
      `<a href=${item.href.url} alt=${item.href.alt}>${item.text}</a>`
    )
  } else {
    return body.concat(`<p>${item.text}</p>`)
  }
}

export function createLabel(body: string, label: Item) {
  return setLabel(body, label)
}
