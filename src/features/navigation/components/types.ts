import { Route } from '../types'

export interface DesktopNavProps {
  routes: Route[]
  activeRoute: string
}

export interface MobileDrawerProps extends DesktopNavProps {
  isOpen: boolean
  onClose: () => void
}
