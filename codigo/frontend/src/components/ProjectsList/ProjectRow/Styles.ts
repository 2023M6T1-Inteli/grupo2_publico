import { Link } from "react-router-dom";
import styled from "styled-components";

import trash from '../../../assets/img/trash.svg'
import pencil from '../../../assets/img/pencil.svg'

export const Wrapper = styled(Link)`
  text-decoration: none;
  padding: .5rem 1rem;
  display: inline-flex;
  justify-content: space-between;
  color: #000;
  z-index: 1;

  &:not(:first-of-type) {
    border: 0.2px solid #C4C4C4;
    border-top: none;
  }

  &:last-of-type{
    border-radius: 0 0 .5rem .5rem;
  }

  &:first-of-type{
    border-radius: .5rem .5rem 0 0;
    border: 0.2px solid #C4C4C4;
  }

  &:hover {
    box-shadow:
    inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0,
    0 1px 2px 0 rgba(60, 64, 67, .3),
    0 1px 3px 1px rgba(60, 64, 67, .15);
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: max-content;
  z-index: 2;

  & button {
    margin: 0 .5rem;
  }
`

export const EditButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  background-image: url(${pencil});
  background-size: 14px;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 2;
  transition: .2s ease;

  &:hover {
    transform: scale(1.2);
  }
`
export const TrashButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  background-image: url(${trash});
  background-size: 18px;
  background-position: center;
  background-repeat: no-repeat;
  transition: .2s ease;
  filter:
    brightness(0)
    saturate(100%)
    invert(31%)
    sepia(100%)
    saturate(7237%)
    hue-rotate(15deg)
    brightness(97%)
    contrast(100%);

    &:hover {
      transform: scale(1.2);
    }
  `
