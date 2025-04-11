"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ThreeDCardProps {
  image: string;
  title: string;
  dark?: boolean;
}

const ThreeDCard = ({ image, title, dark }: ThreeDCardProps) => {
  return (
    <CardContainer
      className="w-full rounded-xl h-full"
      containerClassName="w-full h-full rounded-xl"
    >
      <CardBody className=" relative group/card  bg-white w-full h-full rounded-xl">
        <CardItem
          translateZ="40"
          className="w-full h-full relative aspect-square"
        >
          <Image
            src={image}
            fill
            className="w-full object-cover rounded-xl group-hover/card:shadow-xl "
            alt="thumbnail"
          />
        </CardItem>

        <CardItem
          translateZ={80}
          translateY={20}
          className={cn(
            "text-white rounded-2xl px-8 py-2 absolute bottom-1 right-0 backdrop-blur-xl text-xl lg:text-2xl text-center mx-1",
            dark ? "bg-[#1A2B2380]" : "bg-[#4DB9B9]/50"
          )}
        >
          {title}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default ThreeDCard;
