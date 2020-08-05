import { Label, createLabel } from "./Label"
import { Link } from "./Link"
import { Components } from "./Components"
import { setBody } from "./Body"

export interface Item {
  type?: string
  text?: Label
  href?: Link
  components?: Components
}

export function createItem(body: string, item: Item) {
  switch (item.type) {
    case "label":
      body = createLabel(body, item)
  }
  return setBody(body)
}
