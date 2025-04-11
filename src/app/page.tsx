import Header from "@/components/main/Header";
// import About from "@/widgets/About";
import Advantage from "@/widgets/Advantage";
import Category from "@/widgets/Category";
import FAQ from "@/widgets/FAQ";
import Hero from "@/widgets/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* <About /> */}
        {/* <Advantage /> */}
        {/* <Category />
        <FAQ /> */}
      </main>
    </>
  );
}
