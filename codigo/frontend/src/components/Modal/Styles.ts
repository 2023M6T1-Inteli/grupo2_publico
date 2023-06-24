import styled from "styled-components";

export const Wrapper = styled.div`
  inset: 0;
  z-index: 3;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .7);
`;

export const Container = styled.div`
  width: 60%;
  height: 80%;
  border-radius: 1rem;
  padding: 2rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;