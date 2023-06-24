import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: auto;
`

export const Title = styled.h1`
  text-align: center;
  margin: 0;
  color: #528265;
  font-size: 2.2rem;
`

export const Form = styled.form`
  & > * {
    margin: 2rem 0;
  }
`

export const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`

export const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  & > * {
    flex: 1;
  }
`
