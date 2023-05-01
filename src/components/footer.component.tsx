import { StyledFooter } from '@/styles/footer.styles';
import Link from 'next/link';

const FooterComponent = () => {
  return (
    <StyledFooter>
      <div>
        <section>
          <h2>Sobre</h2>
          <nav>
            <Link href="/">Quem somos</Link>
            <Link href="/">FAQ (Dúvidas frequentes)</Link>
            <Link href="/">Políticas e termos de uso</Link>
            <Link href="/">Entre em contato</Link>
          </nav>
        </section>

        <section>
          <h2>Marketing</h2>
          <nav>
            <Link href="/">Compramos suas Tibia Coins</Link>
          </nav>
        </section>

        <section>
          <h2>Social</h2>
          <nav>
            <Link href="/">Facebook</Link>
            <Link href="/">Instagram</Link>
          </nav>
        </section>
      </div>
    </StyledFooter>
  );
};

export default FooterComponent;
