import { StyledFormError } from '@/styles/formError.styles';
import { StyledInput } from '@/styles/input.styles';
import { StyledLabel } from '@/styles/label.styles';
import { StyledSession } from '@/styles/session.styles';

const RegisterPage = () => {
  return (
    <StyledSession>
      <form>
        <div>
          <StyledInput id="name" name="name" type="text" placeholder=" " />
          <StyledLabel htmlFor="name">Nome</StyledLabel>
          <StyledFormError></StyledFormError>
        </div>

        <div>
          <StyledInput id="email" name="email" type="text" placeholder=" " />
          <StyledLabel htmlFor="email">E-mail</StyledLabel>
          <StyledFormError></StyledFormError>
        </div>
      </form>
    </StyledSession>
  );
};

export default RegisterPage;
