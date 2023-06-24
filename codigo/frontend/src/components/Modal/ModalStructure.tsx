import { Container, Wrapper } from "./Styles";
import { ReactNode } from "react";

interface ModalStructureProps {
  children: ReactNode;
}

export default function ModalStructure(props: ModalStructureProps) {
  return (
    <Wrapper>
      <Container>
        {props.children}
      </Container>
    </Wrapper>
  )
}