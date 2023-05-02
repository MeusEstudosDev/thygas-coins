import { IUserEdit } from '@/interfaces/users.interfaces';
import { StyledFormError } from '@/styles/formError.styles';
import { StyledInput } from '@/styles/input.styles';
import { StyledLabel } from '@/styles/label.styles';
import { StyledModal } from '@/styles/modalstyles';
import { TitleH2 } from '@/styles/typography';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const EditUserModal = () => {
  const [visiblePassword, setVisiblePassword] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserEdit>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().optional(),
        email: yup.string().email('deve ser um e-mail válido').optional(),
        password: yup.string().optional(),
      })
    ),
  });

  const changeVisiblePassword = (): void => {
    visiblePassword ? setVisiblePassword(false) : setVisiblePassword(true);
  };

  const handle = async (data: IUserEdit) => {};

  return (
    <StyledModal>
      <section>
        <form onSubmit={handleSubmit(handle)}>
          <TitleH2>Editar</TitleH2>
          <div>
            <StyledInput
              {...register('name')}
              id="name"
              name="name"
              type="text"
              placeholder=" "
            />
            <StyledLabel>Nome</StyledLabel>
            <StyledFormError>
              {errors.name && errors.name.message}
            </StyledFormError>
          </div>

          <div>
            <StyledInput
              {...register('email')}
              id="email"
              name="email"
              type="text"
              placeholder=" "
            />
            <StyledLabel>E-mail</StyledLabel>
            <StyledFormError>
              {errors.email && errors.email.message}
            </StyledFormError>
          </div>

          <div>
            <StyledInput
              {...register('password')}
              id="password"
              name="password"
              type={visiblePassword ? 'text' : 'password'}
              placeholder=" "
            />
            <StyledLabel>Senha</StyledLabel>
            <StyledFormError>
              {errors.password && errors.password.message}
            </StyledFormError>
            <span onClick={() => changeVisiblePassword()}>
              <Image
                src={
                  visiblePassword
                    ? '/image/invisible.png'
                    : '/image/visible.png'
                }
                alt="Visible password"
                width={20}
                height={20}
              />
            </span>
          </div>

          <div>
            <button type="submit">Editar</button>
          </div>
        </form>
      </section>
    </StyledModal>
  );
};

export default EditUserModal;
