import { UserContext } from '@/contexts/user.context';
import { StyledAccount } from '@/styles/account.styles';
import React from 'react';

const AccountPage = () => {
  const userContext = React.useContext(UserContext);

  return (
    <StyledAccount>
      <section>
        <h2 style={{ width: '110px' }}>Minha conta</h2>
        <div>
          <p>
            <strong>Nome: </strong>
            {userContext.user?.name}
          </p>
          <p>
            <strong>E-mail: </strong>
            {userContext.user?.email}
          </p>
          <p>
            <strong>Cadastro: </strong>
            {userContext.user?.registered_at.toString()}
          </p>
        </div>
        <button
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          Editar
        </button>
      </section>
    </StyledAccount>
  );
};

export default AccountPage;
