import { Style } from "./Style"
import { Label } from "./Label"
import { Link } from "./Link"
import { Components } from "./Components"

export interface Item {
  type: string
  style?: Style
  text?: Label
  href?: Link
  components?: Components
}
