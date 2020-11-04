export interface Action {
  type?: string
  trigger?: string
  options?: { [key: string]: string }
  success?: { type: string }
}
