import Image from "next/image";
import { Container } from "react-bootstrap";
import "./header.scss";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Container>
        <div className="header__wrapper">
          <Link href={"/"} className="header__img">
            <Image
              src={"https://taxivoshod.ru/img/logo1.svg"}
              alt="logo"
              width={240}
              height={75}
              priority
            />
          </Link>
        </div>
      </Container>
    </header>
  );
}
