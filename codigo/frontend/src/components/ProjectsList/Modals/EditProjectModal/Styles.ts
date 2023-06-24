import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

export const Title = styled.h1`
  text-align: center;
  margin: 0;
  color: #528265;
  font-size: 2.2rem;
`

export const Form = styled.form`
  & > * {
    margin: 1rem 0;
  }
`

export const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`