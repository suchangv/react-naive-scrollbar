import { useEffect } from 'react'
import style from '../styles/index.cssr'
import { ScrollbarTheme } from '../types'

const defaultTheme: ScrollbarTheme = {
  color: 'rgba(0, 0, 0, 0.25)',
  colorHover: 'rgba(0, 0, 0, 0.4)',
  scrollbarWidth: '5px',
  scrollbarHeight: '5px',
  scrollbarBorderRadius: '5px',
  cubicBezierTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
}

export function useStyle(customTheme?: ScrollbarTheme) {
  useEffect(() => {
    const theme = {
      ...defaultTheme,
      ...customTheme
    }

    style.mount({
      props: theme,
      id: '-scrollbar'
    })

    console.log(style.render(theme))

    return () => style.unmount()
  }, [customTheme])
}
