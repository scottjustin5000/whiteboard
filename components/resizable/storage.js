import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { Resizer, Closer } from './styles'
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
    onMouseOver={props.onMouseOver}
    onMouseLeave={props.onMouseLeave}
    >
      <StorageSvg width={props.width} height={props.height} />
      <Closer>
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => { props.onDelete(props.index) }} />
      </Closer>
      <Resizer onMouseDown={props.onMouseDown}  />
    </StorageBase>
  )
})
export default Storage


