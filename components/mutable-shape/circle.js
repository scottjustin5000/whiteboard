
import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { Closer } from './styles'

const CircleBase = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  position:absolute;
  width: 100%; 
  height:100%;
  resize: both;
  overflow: ${props => props.overflow ? props.overflow : 'auto'};
`

const Circle = (props)=> {
  return (
    <CircleBase overflow={props.overflow}>
      <Closer>
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => { props.onDelete(props.index) }} />
      </Closer>
    </CircleBase>
  )
}

export default Circle