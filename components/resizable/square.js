
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
const SquareDragger = styled.div`
width: 100%;
height:100%;
border: 1px solid #000;
box-sizing: border-box;
cursor: grab
`
const SquareCloser = styled.div`
position: absolute;
right: 0px;
top: -18px;
width: 20px;
height: 20px;
cursor: pointer;
display: ${props => props.display ? props.display : 'none'}
`
const Square = React.forwardRef((props, ref) => {
  return (
    <SquareBase
     ref={ref}
      overflow={props.overflow}
      onMouseDown={props.onMouseDown}>
      <SquareCloser display={props.display}>
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => { props.onDelete(props.index) }} />
      </SquareCloser>
      {/* <SquareDragger> */}
        <Resizer onMouseDown={props.onMouseDown} />
      {/* </SquareDragger> */}
    </SquareBase>
  )
})

export default Square