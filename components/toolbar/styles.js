import styled from 'styled-components'

const ToolbarComponent = styled.div`
  border: 1px solid #F0F0F0;
  position: fixed;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  width: 56px; 
  background-color:#F0F0F0;
  box-shadow: 0 2px 2px #ccc;
  padding: 6px 8px;
  z-index: 101;
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

const LineWrapper = styled.div`
 display: flex;
 justify-content: center;
`
const LineDisplay = styled.div`
  display: flex;
  width: 22px; 
  justify-content: center; 
  align-items:center;  
  height: 22px;
  border: 3px solid ${props=> props.color};
  text-align: center;
  vertical-align: middle; 
  border-radius: 50%;
`

export {
  ToolbarComponent,
  ToolbarButton,
  LineWrapper,
  LineDisplay
}