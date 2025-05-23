import backgroundAbout from "../../../assets/backgroundAbout.jpg";

const BackgroundSession = () => {
  return (
    <section
      className="relative h-full bg-cover bg-center flex items-center justify-center text-center text-white"
      style={{ backgroundImage: `url(${backgroundAbout})` }}
    >
     <div className="bg-black bg-opacity-50 p-4 rounded translate-y-10">
    <h1 className="text-3xl font-bold">
      Lập Kế Hoạch Thông Minh Cho Sự Kiện Của Bạn
    </h1>
  </div>
    </section>
  );
};

export default BackgroundSession;
