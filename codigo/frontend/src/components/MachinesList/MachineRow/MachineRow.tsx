import { MouseEvent } from 'react';
import {
  Wrapper,
  Detail,
  ButtonsWrapper,
  EditButton,
  TrashButton,
} from './Styles';

interface MachineRowProps {
  id: string;
  name: string;
  maxMasterRollWidth: number;
  minMasterRollWidth: number;
  maxRolls: number;
  handleEditModal: () => void;
  handleDeletePress: () => void;
}

export default function MachineRow(props: MachineRowProps) {
  const handleEditClick = (e: MouseEvent) => {
    e.preventDefault();
    props.handleEditModal();
  };

  const handleTrashClick = (e: MouseEvent) => {
    e.preventDefault();
    props.handleDeletePress();
  };

  return (
    <Wrapper>
      <Detail>{props.name}</Detail>
      <Detail>{props.minMasterRollWidth}</Detail>
      <Detail>{props.maxMasterRollWidth}</Detail>
      <Detail>{props.maxRolls}</Detail>
      <ButtonsWrapper>
        <EditButton onClick={handleEditClick} />
        <TrashButton onClick={handleTrashClick} />
      </ButtonsWrapper>
    </Wrapper>
  );
}
