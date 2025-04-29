"use client";

import Logo from "@/components/main/Logo";

export const TitleSection = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-32 h-12 flex items-center">
        <Logo dark />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-xl font-bold text-white">
          Монголын эм хангамжийн шинэчлэл холбоо
        </h1>
        <p className="text-sm mt-0.5 text-white">
          Нийтийн үйлчилгээтэй эмийн сангийн нэгдсэн Монголын эм хангамжийн
          шинэчлэл холбоотой 77102077 дугаарт холбогдоно уу
        </p>
      </div>
    </div>
  );
};
