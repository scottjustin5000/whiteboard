
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

const Circle = React.forwardRef((props, ref)=> {
  return (
    <CircleBase
      ref={ref}
      overflow={props.overflow}
      onMouseDown={props.onMouseDown}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
      >
      <Closer>
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => { props.onDelete(props.index) }} />
      </Closer>
        <Resizer onMouseDown={props.onMouseDown} />
    </CircleBase>
  )
})

export default Circle
