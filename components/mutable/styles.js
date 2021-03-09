import styled from 'styled-components'

const Resizer = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 20px;
  height: 20px;
  cursor: nwse-resize;
  z-index: 600;
`
const Base = styled.div.attrs(props =>({
  style: {
  width: props.width,
  height: props.height,
  top: props.top,
  left: props.left,
  }
}))`resize: both;
 cursor: grab;
 position: absolute;
 `

export {
  Base,
  Resizer
}