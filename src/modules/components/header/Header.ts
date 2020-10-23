import { AdvancedTitle } from './AdvancedTitle'
import { HeaderStyle } from './HeaderStyle'

export interface Header {
  title: string | AdvancedTitle
  style?: HeaderStyle
}
