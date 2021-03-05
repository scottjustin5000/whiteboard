import  React from 'react'
import styled from 'styled-components'
import CloudSvg from '../icons/cloud'

const CloudBase = styled.div`
resize: both;
cursor: grab;
position:absolute;
width: 100%; 
height:100%;
overflow: ${props => props.overflow ? props.overflow : 'auto'};
`

const Cloud = (props) => {
  return (
    <CloudBase overflow={props.overflow}>
     <CloudSvg color={props.color} width={props.width} height={props.height} />
  </CloudBase>
  )
}
export default Cloud