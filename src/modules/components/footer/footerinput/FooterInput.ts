import { FooterInputStyle } from './FooterInputStyle'
import { FooterLeft } from './FooterLeft'
import { FooterRight } from './FooterRight'
import { FooterTextfield } from './FooterTextfield'
export interface FooterInput {
  textfield: FooterTextfield
  left: FooterLeft
  right: FooterRight
  style?: FooterInputStyle
}
