import Image from "next/image";

const Hero = () => {
  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center"
      id="home"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 lg:flex-row flex-col">
          <div className="lg:flex-1 space-y-4 flex-auto text-center">
            <h1 className="text-gray-800 font-bold text-xl lg:text-4xl">
              МОНГОЛЫН ЭМ ХАНГАМЖИЙН ШИНЭЧЛЭЛ ХОЛБОО
            </h1>
            <p className="text-gray-500 text-lg lg:text-xl font-light">
              нийтийн үйлчилгээтэй эмийн сангуудын нэгдсэн гишүүддээ үйлчилдэг
              төрийн бус байгууллага
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
