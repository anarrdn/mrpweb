"use client";

import Image from "next/image";

interface SectionProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  titleAlignment: "left" | "center" | "right";
  descriptionAlignment: "left" | "center" | "right";
  imageSize: "small" | "medium" | "large";
}

const imageSizeClasses = {
  small: "h-48",
  medium: "h-64",
  large: "h-96",
};

const textAlignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const Section = ({
  title,
  description,
  image,
  reverse = false,
  titleAlignment,
  descriptionAlignment,
  imageSize,
}: SectionProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
            reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className={`space-y-4 ${textAlignmentClasses[titleAlignment]}`}>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p
              className={`text-gray-600 ${textAlignmentClasses[descriptionAlignment]}`}
            >
              {description}
            </p>
          </div>
          {image && (
            <div
              className={`relative ${imageSizeClasses[imageSize]} rounded-lg overflow-hidden`}
            >
              <Image src={image} alt={title} fill className="object-cover" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Section;
