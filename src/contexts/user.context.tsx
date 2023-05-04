import { IContextProps } from '@/interfaces/global.interfaces';
import { IProducts } from '@/interfaces/products.interfaces';
import { IUserRes } from '@/interfaces/users.interfaces';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LoadingContext } from './loading.context';

interface IUserContext {
  userLogout: () => void;

  user: IUserRes | null;
  setUser: React.Dispatch<React.SetStateAction<IUserRes | null>>;

  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;

  productInfo: IProducts | null;
  setProductInfo: React.Dispatch<React.SetStateAction<IProducts | null>>;

  modalUserEdit: boolean;
  setModalUserEdit: React.Dispatch<React.SetStateAction<boolean>>;

  modalUserDelete: boolean;
  setModalUserDelete: React.Dispatch<React.SetStateAction<boolean>>;

  modalUserRecovery: boolean;
  setModalUserRecovery: React.Dispatch<React.SetStateAction<boolean>>;

  modalProductCreate: boolean;
  setModalProductCreate: React.Dispatch<React.SetStateAction<boolean>>;

  modalProductEdit: boolean;
  setModalProductEdit: React.Dispatch<React.SetStateAction<boolean>>;

  modalProductDelete: boolean;
  setModalProductDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = React.createContext({} as IUserContext);

const UserProvider = ({ children }: IContextProps): JSX.Element => {
  const loadingContext = React.useContext(LoadingContext);

  const [user, setUser] = React.useState<IUserRes | null>(null);

  const [products, setProducts] = React.useState([] as IProducts[]);

  const [productInfo, setProductInfo] = React.useState<IProducts | null>(null);

  const [modalUserEdit, setModalUserEdit] = React.useState<boolean>(false);

  const [modalUserDelete, setModalUserDelete] = React.useState<boolean>(false);

  const [modalUserRecovery, setModalUserRecovery] =
    React.useState<boolean>(false);

  const [modalProductCreate, setModalProductCreate] =
    React.useState<boolean>(false);

  const [modalProductEdit, setModalProductEdit] =
    React.useState<boolean>(false);

  const [modalProductDelete, setModalProductDelete] =
    React.useState<boolean>(false);

  const router = useRouter();

  const userLogout = (): void => {
    loadingContext.setLoading(false);

    setUser(null);

    localStorage.removeItem('token');

    router.push('/');
  };

  React.useEffect(() => {
    loadingContext.setLoading(true);

    const autoLogin = async (): Promise<void> => {
      try {
        const token: string | null = localStorage.getItem('token');

        if (!token) return userLogout();

        const { data } = await axios.get(`/api/users/relogin`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data);
      } catch (e: any) {
        userLogout();
      } finally {
        loadingContext.setLoading(false);
      }
    };

    autoLogin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const listProducts = async () => {
      const { data } = await axios.get('/api/products/list');
      setProducts(data);
    };

    listProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{
        userLogout,
        user,
        setUser,
        products,
        setProducts,
        productInfo,
        setProductInfo,
        modalUserEdit,
        setModalUserEdit,
        modalUserDelete,
        setModalUserDelete,
        modalUserRecovery,
        setModalUserRecovery,
        modalProductCreate,
        setModalProductCreate,
        modalProductEdit,
        setModalProductEdit,
        modalProductDelete,
        setModalProductDelete,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
