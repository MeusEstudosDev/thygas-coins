import { UserContext } from '@/contexts/user.context';
import { StyledHeader } from '@/styles/header.styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useRouter } from 'next/router';
import React from 'react';

const HeaderComponent = () => {
  const userContext = React.useContext(UserContext);

  const router = useRouter();

  return (
    <StyledHeader>
      <div>
        <h2 onClick={() => router.push('/')}>Thygas Coins</h2>
        <form action="">
          <input type="text" placeholder="Procurar produto..." />
          <button>
            <SearchIcon fontSize="large" color="success" />
          </button>
        </form>
        <nav>
          <span
            onClick={() => {
              if (userContext.user) {
                router.push('/account');
              } else {
                router.push('/login');
              }
            }}
          >
            <AccountCircleIcon fontSize="large" color="success" />
            <p>Conta</p>
          </span>
          <span
            onClick={() => {
              if (userContext.user) {
                router.push('/order');
              } else {
                router.push('/login');
              }
            }}
          >
            <RequestPageIcon fontSize="large" color="success" />
            <p>Pedidos</p>
          </span>
          <span
            onClick={() => {
              router.push('/cart');
            }}
          >
            <ShoppingCartCheckoutIcon fontSize="large" color="success" />
            <p>Carrinho</p>
          </span>
        </nav>
      </div>
    </StyledHeader>
  );
};

export default HeaderComponent;
