
import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { Closer } from './styles'

import Mutable from '../mutable'

const CircleBase = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  width: 100%; 
  height:100%;
  resize: both;
  cursor: grab;
  overflow: ${props => props.overflow ? props.overflow : 'auto'};
`

const Circle = (props)=> {
  return (
  <Mutable>
    <CircleBase>
      <Closer>
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => { props.onDelete(props.index) }} />
      </Closer>
    </CircleBase>
  </Mutable>
  )
}

export default Circle
