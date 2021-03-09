import styled from 'styled-components'

const ContextMenu = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  margin-top: -5px;
  margin-left: -5px;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  z-index: 100;
  cursor: default;
  transition: 100ms;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'scale(1)' : 'scale(0.9)'};`

  const ContextButton = styled.button`
    cursor: pointer;
    height: 40px;
    border: none;
    border-radius: 6px;
    width: 100%;
    background-color: #f0f0f0;
    &:hover {
      background-color: #D6D6D6; 
    }
    &:active {
      outline: none;
      border: none;
      }
    &:focus {outline:0;}
`

export  {
  ContextButton,
  ContextMenu
}