import FooterComponent from '@/components/footer.component';
import HeaderComponent from '@/components/header.component';
import StyledGlobal from '@/styles/global.styles';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <StyledGlobal />
      <HeaderComponent />
      <Component {...pageProps} />
      <FooterComponent />
    </>
  );
}
