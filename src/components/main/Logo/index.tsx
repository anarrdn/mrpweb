import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  dark?: boolean;
}

const Logo = ({ dark }: LogoProps) => {
  return (
    <Link href="/">
      <Image src="/branding/mrp.png" alt="Logo" width={135} height={45} />
    </Link>
  );
};

export default Logo;
