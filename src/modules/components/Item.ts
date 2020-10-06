import { Style } from "./Style"
import { Link } from "./Link"
import { Components } from "./Components"

export interface Item {
  type: string
  style?: Style
  text?: string
  href?: Link
  url?: string
  components?: Components
}
