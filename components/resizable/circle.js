
import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { Resizer, Closer } from './styles'

const CircleBase = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  width: 100px; 
  height:100px;
  resize: both;
  cursor: grab;
  overflow: ${props => props.overflow ? props.overflow : 'auto'};
  position: absolute;
  top: 100px; 
  left: 100px;
`
const CircleDragger = styled.div`
width: 100%;
height:100%;
border: 1px solid #000;
border-radius: 50%;
box-sizing: border-box;
cursor: grab
`

const Circle = React.forwardRef((props, ref)=> {
  return (
    <CircleBase
      ref={ref}
      overflow={props.overflow}
      onMouseDown={props.onMouseDown}>
      <Closer>
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => { props.onDelete(props.index) }} />
      </Closer>
      {/* <CircleDragger> */}
        <Resizer onMouseDown={props.onMouseDown} />
      {/* </CircleDragger> */}
    </CircleBase>
  )
})

export default Circle
