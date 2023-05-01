import styled from 'styled-components';

export const StyledSession = styled.main`
  margin: 0 auto;
  padding: 4rem 0;

  > form {
    display: flex;
    flex-direction: column;
    width: 35rem;
    margin: 0 auto;
    gap: 1.5rem;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: end;
      gap: 0.2rem;
      position: relative;
    }
  }
`;
