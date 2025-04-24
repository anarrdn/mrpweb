"use client";

import { EditableSection } from "@/components/ui/editable-section";
import Image from "next/image";

export default function Hero() {
  return (
    <EditableSection section="hero">
      {(content) => {
        console.log("Hero content:", content);
        console.log("Background image:", content.backgroundImage);

        const getValidImageUrl = (url: string | null) => {
          if (!url) return null;

          // If it's a base64 data URL, return it as is
          if (url.startsWith("data:image")) {
            return url;
          }

          // If it's a relative URL, add a leading slash
          if (!url.startsWith("/") && !url.startsWith("http")) {
            return `/${url}`;
          }

          return url;
        };

        const imageUrl = getValidImageUrl(content.backgroundImage);

        return (
          <section className="relative min-h-screen flex items-center justify-center bg-white">
            <div className="absolute inset-0 z-0">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Background"
                  fill
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {content.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                {content.subtitle}
              </p>
            </div>
          </section>
        );
      }}
    </EditableSection>
  );
}

// export const Hero = async  ()=> {

//     const data = await Hero.info()

//     return (
//         <div>
//             {data.title}
//             {data.sub_title}
//         </div>
//     )
// }
