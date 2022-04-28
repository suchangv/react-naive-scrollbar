import React, {
  FC,
  CSSProperties,
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect
} from 'react'

import { useStyle } from './hooks'
import { ScrollbarTheme } from './types'

export interface ScrollbarProps {
  style?: CSSProperties
  customTheme?: ScrollbarTheme
  clsPrefix?: string
  xScrollable: boolean
}

export const Scrollbar: FC<ScrollbarProps> = ({
  children,
  style,
  customTheme,
  xScrollable
}) => {
  useStyle(customTheme)

  const [x, setX] = useState(0)

  // dom ref
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const yRailRef = useRef<HTMLDivElement>(null)
  const xRailRef = useRef<HTMLDivElement>(null)

  // data ref
  const contentHeightRef = useRef<number | null>(null)
  const contentWidthRef = useRef<number | null>(null)
  const containerWidthRef = useRef<number | null>(null)
  const containerHeightRef = useRef<number | null>(null)
  const containerScrollTopRef = useRef(0)
  const containerScrollLeftRef = useRef(0)
  const isShowXBarRef = useRef(false)
  const isShowYBarRef = useRef(false)

  // state
  const [xRailSize, setXRailSize] = useState(0)
  const [yRailSize, setYRailSize] = useState(0)

  // const yBarSizePx = useMemo((): number => {
  //   const { current: containerHeight } = containerHeightRef
  //   const { current: contentHeight } = containerHeightRef
  //   const { current: yRailSize } = yRailSizeRef

  //   console.log({ containerHeight, contentHeight, yRailSize })

  //   if (
  //     containerHeight === null ||
  //     contentHeight === null ||
  //     yRailSize === null
  //   ) {
  //     return 0
  //   } else {
  //     return Math.min(
  //       containerHeight,
  //       (yRailSize * containerHeight) / contentHeight + 5 * 1.5
  //     )
  //   }
  // }, [])

  const syncScrollState = useCallback(() => {
    const { current: container } = containerRef
    if (container) {
      containerScrollTopRef.current = container.scrollTop
      containerScrollLeftRef.current = container.scrollLeft
    }
  }, [])

  const syncPositionState = useCallback(() => {
    const { current: content } = contentRef
    if (content) {
      contentHeightRef.current = content.offsetHeight
      contentWidthRef.current = content.offsetWidth
    }

    const { current: container } = containerRef
    if (container) {
      containerHeightRef.current = container.offsetHeight
      containerWidthRef.current = container.offsetWidth
    }

    const { current: xRailEl } = xRailRef
    const { current: yRailEl } = yRailRef
    if (xRailEl) {
      setXRailSize(xRailEl.offsetWidth)
    }
    if (yRailEl) {
      setYRailSize(yRailEl.offsetHeight)
    }
  }, [])

  const sync = useCallback(() => {
    syncPositionState()
    syncScrollState()
  }, [syncPositionState, syncScrollState])

  useEffect(() => {
    sync()
  }, [sync])

  return (
    <div className="n-scrollbar" role="none" style={style} ref={wrapperRef}>
      <div className="n-scrollbar-container" role="none" ref={containerRef}>
        <div className="n-scrollbar-content" role="none" ref={contentRef}>
          {children}
        </div>
      </div>

      <div
        className="n-scrollbar-rail n-scrollbar-rail--vertical"
        aria-hidden
        ref={yRailRef}
      >
        <div
          className="n-scrollbar-rail__scrollbar"
          style={{
            height: yRailSize
            // top: yBarTopPx
          }}
        />
      </div>

      {/* <div
        className="n-scrollbar-rail n-scrollbar-rail--horizontal"
        aria-hidden
        ref={xRailRef}
      >
        <div className="n-scrollbar-rail__scrollbar" />
      </div> */}
    </div>
  )
}
