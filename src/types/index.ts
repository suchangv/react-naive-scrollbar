import { CSSProperties } from 'react'

export interface ScrollbarTheme {
  scrollbarWidth?: string
  scrollbarHeight?: string
  scrollbarBorderRadius?: string
  cubicBezierTimingFunction?: CSSProperties['transitionTimingFunction']
  color?: string
  colorHover?: string
}
