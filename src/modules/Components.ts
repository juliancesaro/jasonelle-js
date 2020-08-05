import { Component } from "./Component"
import { createItem } from "./Item"
import { setBody } from "./Body"

export interface Components extends Array<Component> {}

export function createComponents(body: string, components: Components) {
  for (let i = 0; i < components.length; i++) {
    let component = components[i]
    body = createItem(body, component)
  }
  return setBody(body)
}
