
import styled from 'styled-components'

const ColorCircle = styled.div`
  padding: 8px;
  div {
    width: 22px;
    height: 22px;
    border-radius: 11px;
    background-color: ${props => props.color};
    cursor: pointer;
  }
`
const ToolbarButton = styled.button`
  cursor: pointer;
  height: 40px;
  border: none;
  border-radius: 6px;
  background-color: ${props=> props.selected ? '#D6D6D6;' : '#f0f0f0;'} 
  &:hover {
    background-color: #D6D6D6; 
  }
  &:active {
    outline: none;
    border: none;
    }
  &:focus {outline:0;}
`

export {
  ColorCircle,
  ToolbarButton
}