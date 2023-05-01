import styled from 'styled-components';

export const StyledInput = styled.input`
  padding: 1.2rem 0.8rem;
  border: 0.1rem solid var(--color-fourth);
  border-radius: 0.6rem;
  background-color: var(--color-grey-7);
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0.2rem var(--color-fourth);
  }
  &:focus + label {
    top: -1.8rem;
    left: 0.2rem;
    color: var(--color-primary);
  }
  &:not(:placeholder-shown) + label {
    top: -1.8rem;
    left: 0.2rem;
    color: var(--color-primary);
  }
  ::placeholder {
    font-size: 1.4rem;
    letter-spacing: 0.1rem;
  }
`;
