import styled from 'styled-components';

export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 40rem;
  background-color: #00000099;
  color: var(--color-third);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  cursor: default;
  .desc-modal {
    height: auto;
    gap: 0.8rem;
  }
  > section {
    background-color: var(--color-grey-9);
    padding: 1.2rem;
    border-radius: 0.6rem;
    border: 0.2rem solid var(--color-fourth);
    > form {
      width: 30.9rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      background-color: var(--color-grey-9);
      padding: 1.8rem;
      border-radius: 0.6rem;
      > div {
        display: flex;
        flex-direction: column;
        justify-content: end;
        gap: 0.2rem;
        position: relative;
        > span {
          position: absolute;
          right: 1rem;
          top: 2.5rem;
          cursor: pointer;
          opacity: 0.5;
        }
      }
      > span {
        display: flex;
        gap: 1.2rem;
      }
    }
  }
`;
