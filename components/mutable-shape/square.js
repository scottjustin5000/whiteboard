import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const SquareBase = styled.div`
border: ${props=> props.lineWidth}px  solid ${props => props.color || '#000'};
width: 100%; 
height:100%;
resize: both;
position:absolute;
overflow: ${props => props.overflow ? props.overflow : 'auto'};
`

const SquareCloser = styled.div`
position: absolute;
z-index: 101;
right: -2px;
top: -18px;
width: 20px;
height: 20px;
cursor: pointer;
`
const Square =(props) => {
  return (
    <SquareBase 
      lineWidth={props.lineWidth}
      color={props.color} 
      overflow={props.overflow}>
      <SquareCloser>
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => { props.onDelete(props.index) }} />
      </SquareCloser>
    </SquareBase>
  )
}

export default Square