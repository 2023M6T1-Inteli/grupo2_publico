import styled from "styled-components";
import { InputProps } from "./Input";

export const Wrapper = styled.div<{ width: string | undefined, margin: string | undefined }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || '100%'};
  gap: .5rem;
  margin ${(props) => props.margin || '0'};
`

export const Label = styled.label`
`

export const InputStyled = styled.input<InputProps>`
  padding: .65rem;
  border-radius: .5rem;
  border: none;
  outline: none;
  border: 0.2px solid #C4C4C4;
  width: ${(props) => props.width || '100%'};
  transition: .2s ease;

  &:hover {
    border: 0.2px solid #E7E7E7;
    box-shadow: 0 0 0 1px #E7E7E7;
  }

  &:active, {
    border: 0.2px solid #E7E7E7;
  }

  `