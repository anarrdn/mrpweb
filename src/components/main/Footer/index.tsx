import { MENU } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="py-16 relative text-white mt-auto">
      <div className="w-full h-full absolute top-0 right-0 -z-[1]">
        <Image
          src="/images/footer_bg-min.webp"
          alt="footer"
          fill
          className="object-cover"
        />
      </div>
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center gap-16 md:flex-row flex-col">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <Logo dark={false} />
            <Link href="mailto:marketing@zahii.mn">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/mail-min.webp"
                  height={24}
                  width={24}
                  alt="mail"
                />
                <p>marketing@zahii.mn</p>
              </div>
            </Link>
            <Link href="tel:75882288">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/phone-min.webp"
                  height={24}
                  width={24}
                  alt="phone"
                />
                <p>7588 2288</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-8">
            {MENU.map((item) => (
              <Link
                href={`#${item.href}`}
                key={item.href}
                className="hover:scale-105 transition-all duration-150"
              >
                <p className="text-white">{item.label}</p>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.facebook.com/ZahiiApp"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/images/Facebook-min.webp"
                alt="facebook"
                width={30}
                height={30}
                className="hover:scale-105 transition-all duration-150"
              />
            </Link>
            <Link
              href="https://www.instagram.com/zahii_app/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/images/Instagram-min.webp"
                alt="instagram"
                width={30}
                height={30}
                className="hover:scale-105 transition-all duration-150"
              />
            </Link>
          </div>
        </div>
        <div className="mt-16 mb-8 w-full border-t border-t-white" />
        <div className="text-center">
          <p className="">
            {new Date().getFullYear()} Techpartners All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
