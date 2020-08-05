import { Sections, createSections } from "./Sections"

export interface Body {
  sections: Sections
}

export function setBody(body: string) {
  return `<body>${body}</body>`
}

export function createBody(body: string, data: Body) {
  for (const bodyComponent in data) {
    switch (bodyComponent) {
      case "sections": {
        body = createSections(body, data.sections)
      }
    }
  }
  return setBody(body)
}
