import styled from "styled-components";

export const Container = styled.div`
  margin-top: 3rem;
  max-height: 387px;
  width: calc(100% - 6rem);
  display: flex;
  padding: 1rem 0;
  flex-direction: column;
  overflow: auto;
`

export const HeaderRow = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1rem;
  margin-bottom: 1rem;
  justify-content: space-between;
  align-items: center;
`

export const HeaderColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  padding: 0 1rem;
`
