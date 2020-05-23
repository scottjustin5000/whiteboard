
import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { Resizer } from './styles'

const SquareBase = styled.div`
border: 1px solid black;
width: 100px; 
height:100px;
resize: both;
cursor: grab;
position: absolute;
overflow: ${props => props.overflow ? props.overflow : 'auto'};
top: 100px; 
left: 100px;
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
const Square = React.forwardRef((props, ref) => {

  return (
    <SquareBase
     ref={ref}
      overflow={props.overflow}
      onMouseDown={props.onMouseDown}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
      >
      <SquareCloser>
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => { props.onDelete(props.index) }} />
      </SquareCloser>
        <Resizer onMouseDown={props.onMouseDown} />
    </SquareBase>
  )
})

export default Square