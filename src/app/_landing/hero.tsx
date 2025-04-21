"use client";

import { EditableSection } from "@/components/ui/editable-section";
import Image from "next/image";

export default function Hero() {
  return (
    <EditableSection section="hero">
      {(content) => (
        <section className="relative min-h-screen flex items-center justify-center bg-white">
          <div className="absolute inset-0 z-0">
            {content.backgroundImage &&
              typeof content.backgroundImage === "string" &&
              content.backgroundImage.trim() !== "" && (
                <Image
                  src={content.backgroundImage}
                  alt="Background"
                  fill
                  className="object-cover"
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
      )}
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
