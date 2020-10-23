import { Header } from './header/Header'
import { Sections } from './Sections'
import { Footer } from './footer/Footer'

export interface Body {
  header: Header
  sections: Sections
  footer: Footer
}
