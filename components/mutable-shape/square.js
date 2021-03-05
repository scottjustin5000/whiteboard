import React from 'react'
import styled from 'styled-components'

const SquareBase = styled.div`
border: ${props=> props.lineWidth}px  solid ${props => props.color || '#000'};
width: 100%; 
height:100%;
resize: both;
position:absolute;
overflow: ${props => props.overflow ? props.overflow : 'auto'};
`

const Square =(props) => {
  return (
    <SquareBase 
      lineWidth={props.lineWidth}
      color={props.color} 
      overflow={props.overflow}>
    </SquareBase>
  )
}

export default Square