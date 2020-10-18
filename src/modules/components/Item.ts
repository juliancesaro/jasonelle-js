import { Style } from "./Style"
import { Link } from "./Link"
import { Components } from "./Components"

export interface Item {
  type: string
  style?: Style
  text?: string
  href?: Link
  url?: string
  name?: string
  value?: string
  placeholder?: string
  keyboard?: string
  focus?: string
  components?: Components
}
