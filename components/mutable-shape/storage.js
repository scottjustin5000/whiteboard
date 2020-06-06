import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import StorageSvg from '../icons/storage'

const StorageBase = styled.div`
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

const Storage =(props) => {
  return (
    <StorageBase overflow={props.overflow}>
      <Closer>
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => { props.onDelete(props.index) }} />
      </Closer>
      <StorageSvg color={props.color} width={props.width} height={props.height} />
    </StorageBase>
  )
}

export default Storage


