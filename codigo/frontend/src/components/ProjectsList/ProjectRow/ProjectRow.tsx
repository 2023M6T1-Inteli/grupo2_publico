import { ButtonsWrapper, EditButton, TrashButton, Wrapper } from './Styles';

import { MouseEvent, useState } from 'react';

interface ProjectRowProps {
  id: string;
  name: string;
  handleEditModal: () => void;
  handleDeletePress: () => void;
  setSelectedProject?: any;
}

export default function ProjectRow(props: ProjectRowProps) {
  const handleEditClick = (e: MouseEvent) => {
    e.preventDefault();
    props.handleEditModal();
  };

  const handleTrashClick = (e: MouseEvent) => {
    e.preventDefault();
    props.handleDeletePress();
  };

  return (
    <Wrapper to={props.id}>
      {props.name}
      <ButtonsWrapper>
        <TrashButton onClick={handleTrashClick} />
      </ButtonsWrapper>
    </Wrapper>
  );
}
