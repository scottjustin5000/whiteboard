import React from 'react'
import styled from 'styled-components'
import StorageSvg from '../icons/storage'

const StorageBase = styled.div`
  resize: both;
  cursor: grab;
  position:absolute;
  width: 100%; 
  height:100%;
  overflow: ${props => props.overflow ? props.overflow : 'auto'};
`

const Storage =(props) => {
  return (
    <StorageBase overflow={props.overflow}>
      <StorageSvg color={props.color} width={props.width * props.scale} height={props.height * props.scale} />
    </StorageBase>
  )
}

export default Storage


