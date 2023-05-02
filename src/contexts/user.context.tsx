import { IContextProps } from '@/interfaces/global.interfaces';
import { IUserRes } from '@/interfaces/users.interfaces';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LoadingContext } from './loading.context';

interface IUserContext {
  user: IUserRes | null;
  setUser: React.Dispatch<React.SetStateAction<IUserRes | null>>;
}

export const UserContext = React.createContext({} as IUserContext);

const UserProvider = ({ children }: IContextProps): JSX.Element => {
  const loadingContext = React.useContext(LoadingContext);

  const [user, setUser] = React.useState<IUserRes | null>(null);

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
