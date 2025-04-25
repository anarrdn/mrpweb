import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Hero from "./hero";
import Goal from "./goal";
import History from "./history";
import Greeting from "./greeting";
import Structure from "./structure";

export default function MainPage() {
  return (
    <>
      <Hero />
      <Goal />
      <History />
      <Greeting />
      <Structure />
    </>
  );
}
