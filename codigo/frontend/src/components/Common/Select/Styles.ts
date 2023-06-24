import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Label = styled.label`
  margin: 0;
`

export const SelectContainer = styled.div`
  width: 200px;
  position: relative;

  &::after {
    content: '▼';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

export const SelectElement = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: blue;
  }
`;

export const Option = styled.option`
  padding: 1rem;
  background: purple;
`