import  React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import CloudSvg from '../icons/cloud'

const CloudBase = styled.div`
resize: both;
cursor: grab;
position:absolute;
width: 100%; 
height:100%;
overflow: ${props => props.overflow ? props.overflow : 'auto'};
`

const Closer = styled.div`
position: absolute;
right: 0px;
top: -20px;
width: 20px;
height: 20px;
cursor: pointer;
`
const Cloud = (props) => {
  return (
    <CloudBase overflow={props.overflow}>
     <CloudSvg color={props.color} width={props.width} height={props.height} />
     <Closer>
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => { props.onDelete(props.index) }} />
      </Closer>
  </CloudBase>
  )
}
export default Cloud