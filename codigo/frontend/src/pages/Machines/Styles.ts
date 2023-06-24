import styled from "styled-components";

import search from '../../assets/img/search.svg'
import plus from '../../assets/img/plus.svg'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  width: 80vw;
`

export const Title = styled.h1`
  color: #528265;
  font-weight: 700;
  font-size: 3rem;
`

export const SearchRow = styled.div`
  width: 100%;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
`

export const SearchInput = styled.input`
  padding: .5rem 2.5rem .5rem .5rem;
  border-radius: .5rem;
  width: 15rem;
  border: 1px solid #9F9F9F;
  outline: none;
  background-image: url(${search});
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: 94%;
`

export const NewProject = styled.button`
  padding: .5rem 1.2rem .5rem 2rem;
  text-align: right;
  border-radius: .5rem;
  border: none;
  background: #528265;
  color: #fff;
  background-image: url(${plus});
  background-repeat: no-repeat;
  background-size: 18px;
  background-position: .5rem center;
  transition: .2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`