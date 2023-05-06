import { StyledFooter } from '@/styles/footer.styles';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FooterComponent = () => {
  const router = useRouter();

  return (
    <StyledFooter>
      <a
        href="https://api.whatsapp.com/send?phone=+55++5532998274714&text=Ol%C3%A1..."
        target="_blank"
      >
        <Image
          src="/image/whatsapp.png"
          alt="Whatsapp"
          width={50}
          height={50}
        />
      </a>

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
