import backgroundPlanning from "../../../assets/backgroundPlanning.jpg";

const BackgroundSession = () => {
  return (
    <section
      className="relative h-full bg-cover bg-center flex items-center justify-center text-center text-white"
      style={{ backgroundImage: `url(${backgroundPlanning})` }}
    >
    </section>
  );
};

export default BackgroundSession;
