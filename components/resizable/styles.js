import styled from 'styled-components'

const Resizer = styled.div`
position: absolute;
right: 0px;
bottom: 0px;
width: 20px;
height: 20px;
cursor: nwse-resize;
z-index: 600;
`

const Closer = styled.div`
position: absolute;
right: 0px;
top: -5px;
width: 20px;
height: 20px;
cursor: pointer;
`

export  {
  Resizer,
  Closer
}