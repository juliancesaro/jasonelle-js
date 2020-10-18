import { Style } from './Style'
import { Link } from './Link'
import { Components } from './Components'
import { Action } from './Action'

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
  action?: Action
  components?: Components
}
