import CssRender from 'css-render'
import bem from '@css-render/plugin-bem'

const cssr = CssRender()
const plugin = bem({
  blockPrefix: '.n-'
})
cssr.use(plugin)

const { c } = cssr
const { cB, cE, cM } = plugin

export default cB(
  'scrollbar',
  {
    overflow: 'hidden',
    position: 'relative',
    zIndex: 'auto',
    height: '100%',
    width: '100%'
  },
  [
    c('>', [
      cB(
        'scrollbar-container',
        {
          width: '100%',
          overflow: 'scroll',
          height: '100%',
          maxHeight: 'inherit',
          scrollbarWidth: 'none'
        },
        [
          c(
            '&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb',
            {
              width: 0,
              height: 0,
              display: 'none'
            }
          ),
          c('>', [
            cB('scrollbar-content', {
              boxSizing: 'border-box',
              minWidth: '100%'
            })
          ])
        ]
      ),
      cB(
        'scrollbar-rail',
        {
          position: 'absolute',
          pointerEvents: 'none',
          userSelect: 'none'
        },
        [
          cM(
            'horizontal',
            ({ props }) => ({
              left: '2px',
              right: '2px',
              bottom: '4px',
              height: props.scrollbarHeight
            }),
            [
              c('>', [
                cE('scrollbar', ({ props }) => ({
                  height: props.scrollbarHeight,
                  borderRadius: props.scrollbarBorderRadius,
                  right: 0
                }))
              ])
            ]
          ),
          cM(
            'vertical',
            ({ props }) => ({
              right: '4px',
              top: '2px',
              bottom: '2px',
              width: props.scrollbarWidth
            }),
            [
              c('>', [
                cE('scrollbar', ({ props }) => ({
                  width: props.scrollbarWidth,
                  borderRadius: props.scrollbarBorderRadius,
                  bottom: 0
                }))
              ])
            ]
          ),
          cM('disabled', [
            c('>', [
              cE('scrollbar', {
                pointerEvents: 'none'
              })
            ])
          ]),
          c('>', [
            cE(
              'scrollbar',
              ({ props }) => ({
                position: 'absolute',
                cursor: 'pointer',
                pointerEvents: 'all',
                backgroundColor: props.color,
                transition: `background-color .2s ${props.cubicBezierTimingFunction}`
              }),
              [
                c('&:hover', ({ props }) => ({
                  backgroundColor: props.colorHover
                }))
              ]
            )
          ])
        ]
      )
    ])
  ]
)
