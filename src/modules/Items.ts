import { Item, createItem } from "./Item"
import { createComponents } from "./Components"
import { setBody } from "./Body"

export interface Items extends Array<Item> {}

export function createItems(body: string, items: Items) {
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    if (item.components) {
      body = createComponents(body, item.components)
    } else {
      body = createItem(body, item)
    }
  }
  return setBody(body)
}
