import Title from "@/components/main/Title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";

const FAQ = () => {
  return (
    <div className="py-32" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <Title bold="Нийтлэг" light="асуулт" type="h5" />
        </div>
        <div className="border-[3px] border-gray-200 rounded-3xl grid grid-cols-1 lg:grid-cols-3 gap-16 p-6 mt-12 lg:mt-24 bg-white">
          <div className="col-span-1 lg:col-span-2">
            <Accordion type="single" collapsible className="space-y-8">
              {FAQS.map((faq, index) => (
                <div key={faq.question} className="flex items-start gap-4">
                  <p className=" text-4xl font-bold text-gray-700 mt-3">
                    0{index + 1}
                  </p>
                  <AccordionItem value={faq.question} className="flex-1">
                    <AccordionTrigger className=" text-xl font-bold text-gray-700">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-lg font-medium text-gray-500">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
            <div className="mt-16">
              <p className="text-gray-800 font-semibold text-2xl mb-2">
                Аппликейшин Татах
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <Image
                    src="/images/qr.png"
                    width={150}
                    height={180}
                    alt="appstore"
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Link href="https://apps.apple.com/us/app/zahii/id6449288619">
                    <Image
                      src="/images/app_store-min.webp"
                      width={200}
                      height={80}
                      alt="appstore"
                      className="hover:scale-105 transition-all duration-150"
                    />
                  </Link>
                  <Link href="https://play.google.com/store/apps/details?id=zahi.techpartners.asia&pli=1">
                    <Image
                      src="/images/play_store-min.webp"
                      width={200}
                      height={80}
                      alt="playstore"
                      className="hover:scale-105 transition-all duration-150"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Image
              src="/images/faq_new_ss.webp"
              width={700}
              height={400}
              alt="faq"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
