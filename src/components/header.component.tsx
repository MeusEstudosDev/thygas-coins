import { StyledHeader } from '@/styles/header.styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useRouter } from 'next/router';

const HeaderComponent = () => {
  const router = useRouter();

  return (
    <StyledHeader>
      <div>
        <h2 onClick={() => router.push('/')}>Thygas Coins</h2>
        <form action="">
          <input type="text" placeholder="Procurar produto..." />
          <button>
            <SearchIcon fontSize="large" color="info" />
          </button>
        </form>
        <nav>
          <span>
            <AccountCircleIcon fontSize="large" color="info" />
            <p>Conta</p>
          </span>
          <span>
            <RequestPageIcon fontSize="large" color="info" />
            <p>Pedidos</p>
          </span>
          <span>
            <ShoppingCartCheckoutIcon fontSize="large" color="info" />
            <p>Carrinho</p>
          </span>
        </nav>
      </div>
    </StyledHeader>
  );
};

export default HeaderComponent;
