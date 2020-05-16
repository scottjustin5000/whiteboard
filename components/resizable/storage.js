import React from 'react'
import styled from 'styled-components'
import { Resizer } from './styles'
import StorageSvg from '../icons/storage'

const StorageBase = styled.div`
resize: both;
cursor: grab;
position: absolute;
overflow: ${props => props.overflow ? props.overflow : 'auto'};
top: 100px; 
left: 100px;
`

const Storage = React.forwardRef((props, ref) => {
  return (
    <StorageBase 
    onMouseDown={props.onMouseDown}
    overflow={props.overflow}
    ref={ref}
    >
      <StorageSvg width={props.width} height={props.height} />
      <Resizer onMouseDown={props.onMouseDown}  />
    </StorageBase>
  )
})
export default Storage


