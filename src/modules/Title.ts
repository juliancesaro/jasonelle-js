export interface Title extends String {}

export function setTitle(head: string, title: string) {
  return head.concat(head, `<title>${title}</title>`)
}

export function createTitle(head: string, title: Title) {
  if (title) {
    return setTitle(head, title.toString())
  } else {
    return ""
  }
}
