import  React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Resizer, Closer } from './styles'
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
    onMouseOver={props.onMouseOver}
    onMouseLeave={props.onMouseLeave}
    >
     <CloudSvg width={props.width} height={props.height} />
     <Closer>
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => { props.onDelete(props.index) }} />
      </Closer>
     <Resizer onMouseDown={props.onMouseDown}  />
  </CloudBase>
  )
})

export default Cloud