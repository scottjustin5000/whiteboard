import  React from 'react'
import styled from 'styled-components'
import { Resizer } from './styles'
import CloudSvg from '../icons/cloud'

const CloudBase = styled.div`
resize: both;
cursor: grab;
position: absolute;
overflow: ${props => props.overflow ? props.overflow : 'auto'};
top: 100px; 
left: 100px;
`
const Cloud = React.forwardRef((props, ref) => {
  return (
    <CloudBase 
    ref={ref}
    onMouseDown={props.onMouseDown}
    overflow={props.overflow}
    >
     <CloudSvg width={props.width} height={props.height} />
     <Resizer onMouseDown={props.onMouseDown}  />
  </CloudBase>
  )
})

export default Cloud