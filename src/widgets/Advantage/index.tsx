import Title from "@/components/main/Title";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Advantage = () => {
  const containerStyle =
    "bg-gray-200 rounded-xl hover:scale-105 transition-all duration-200 hover:shadow-lg";
  return (
    <div className="py-32" id="Advantage">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <Title
            bold="ZAHII-г ашиглах нь"
            light="ямар давуу талтай бэ?"
            type="h3"
          />
        </div>
        <div className="border-[3px] border-gray-200 rounded-xl grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-8 gap-2 p-2 mt-12 lg:mt-24 min-h-[600px] bg-white">
          <div className={cn("row-span-5", containerStyle)}>
            <ItemOne />
          </div>
          <div className={cn("row-span-3", containerStyle)}>
            <ItemTwo />
          </div>
          <div className={cn("row-span-4", containerStyle)}>
            <ItemThree />
          </div>
          <div className={cn("row-span-5", containerStyle)}>
            <ItemFour />
          </div>
          <div className={cn("row-span-4", containerStyle)}>
            <ItemFive />
          </div>
          <div className={cn("row-span-3", containerStyle)}>
            <ItemSix />
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemOne = () => {
  return (
    <div className="px-4 pt-4 flex flex-col group w-full h-full items-center pb-0">
      <p className="text-gray-800 text-3xl font-semibold">
        Аз жаргалыг хүргэнэ
      </p>
      <div>
        <Image
          src="/images/advantage/1.webp"
          width={340}
          height={300}
          alt="advantage"
        />
      </div>
    </div>
  );
};

const ItemTwo = () => {
  return (
    <div className="p-4 flex flex-col group w-full h-full items-center ">
      <p className="text-gray-800 text-3xl font-semibold">ХҮРГЭЛТ 0₮</p>
      <div className="flex items-center justify-end mt-4 w-full h-full">
        <div className="relative w-full h-full max-w-[340px] mx-auto min-h-[140px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "lg:h-24 lg:w-24 h-16 w-16 relative",
                index === 0 && "absolute left-1 top-1",
                index === 1 && "absolute left-16 top-16",
                index === 2 && "absolute left-32 top-1",
                index === 3 && "absolute left-48 top-16",
                index === 4 && "absolute left-64 top-1"
              )}
            >
              <Image
                src={`/images/advantage/2-${index + 1}.webp`}
                alt="advantage"
                fill
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ItemThree = () => {
  return (
    <div className="p-4 flex flex-col group w-full h-full items-center pt-0">
      <div>
        <Image
          src="/images/advantage/3.webp"
          width={300}
          height={300}
          alt="advantage"
        />
      </div>
      <p className="text-gray-800 text-3xl font-semibold pt-4">
        Хэрэглэхэд хялбар
      </p>
    </div>
  );
};

const ItemFour = () => {
  return (
    <div className="p-4 flex flex-col group w-full h-full items-center ">
      <div>
        <Image
          src="/images/advantage/4.webp"
          width={470}
          height={320}
          alt="advantage"
          style={{
            mixBlendMode: "multiply",
          }}
          //   className="group-hover:animate-jiggle "
        />
      </div>
      <p className="text-gray-800 text-3xl font-semibold pt-4">
        +1000 бүтээгдэхүүнүүд
      </p>
    </div>
  );
};

const ItemFive = () => {
  return (
    <div className="p-4 flex flex-col group w-full h-full items-center pt-0">
      <div>
        <Image
          src="/images/advantage/5.png"
          width={280}
          height={300}
          alt="advantage"
          //   className="group-hover:animate-jiggle "
        />
      </div>
      <p className="text-gray-800 text-3xl font-semibold pt-4">
        Худалдан авалт бүр оноотой
      </p>
    </div>
  );
};

const ItemSix = () => {
  return (
    <div className="p-4 flex flex-col group w-full h-full items-center pb-0">
      <p className="text-gray-800 text-3xl font-semibold pb-2">
        Хаанас ч нэвтрэх боломжтой
      </p>
      <div>
        <Image
          src="/images/advantage/6.webp"
          width={320}
          height={90}
          alt="advantage"
          //   className="group-hover:animate-jiggle "
        />
      </div>
    </div>
  );
};

export default Advantage;
