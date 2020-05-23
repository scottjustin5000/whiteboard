import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { Resizer } from './styles'
import StorageSvg from '../icons/storage'

const StorageBase = styled.div`
resize: both;
cursor: grab;
position: absolute;
overflow: ${props => props.overflow ? props.overflow : 'auto'};
top: 150px; 
left: 150px;
width: 60px; 
height: 60px;
`


const Closer = styled.div`
position: absolute;
right: 0px;
top: -20px;
width: 20px;
height: 20px;
cursor: pointer;
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
      <Closer>
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => { props.onDelete(props.index) }} />
      </Closer>
      <StorageSvg width={props.width} height={props.height} />
      
      <Resizer onMouseDown={props.onMouseDown}  />
    </StorageBase>
  )
})
export default Storage


