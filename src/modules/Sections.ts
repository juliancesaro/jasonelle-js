import { Section, createSection } from "./Section"
import { setBody } from "./Body"

export interface Sections extends Array<Section> {}

export function createSections(body: string, sections: Sections) {
  for (let i = 0; i < sections.length; i++) {
    let section = sections[i]
    body = createSection(body, section)
  }
  return setBody(body)
}
