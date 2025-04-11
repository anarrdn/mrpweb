import Title from "@/components/main/Title";
import { CATEGORIES } from "@/lib/config";
import Image from "next/image";
// import Image from "next/image";

const Category = () => {
  return (
    <div className="py-32" id="category">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <Title
            bold="Та уг ангиллуудаас"
            light="хүссэнээ сонгоод захиалаарай."
            type="h4"
          />
        </div>
        <div className="border-[3px] border-gray-200 rounded-3xl p-1 mt-12 lg:mt-24 bg-white">
          <div className="rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {CATEGORIES.map((category) => {
              return <CategoryItem {...category} key={category.title} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryItem = ({ icon, title }: { icon: string; title: string }) => {
  return (
    <div className="group flex items-center gap-4 bg-[#F1F1F1] hover:bg-[#9A9CAB] text-gray-800 hover:text-gray-50 px-6 py-4 transition-all duration-100 font-semibold text-lg">
      <div className="block group-hover:hidden ">
        <Image
          src={`/svg/category/${icon}.svg`}
          alt={title}
          width={30}
          height={30}
        />
      </div>
      <div className="group-hover:block hidden ">
        <Image
          src={`/svg/category/hover/${icon}.svg`}
          alt={title}
          width={30}
          height={30}
        />
      </div>
      <p>{title}</p>
    </div>
  );
};

export default Category;
