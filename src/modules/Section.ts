import { Items, createItems } from "./Items"
import { setBody } from "./Body"

export interface Section {
  items: Items
}

export function createSection(body: string, section: Section) {
  for (const sectionItem in section) {
    switch (sectionItem) {
      case "items":
        body = createItems(body, section.items)
        break
    }
  }
  return setBody(body)
}
