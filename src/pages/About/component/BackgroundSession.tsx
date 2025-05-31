import backgroundAbout from "../../../assets/backgroundAbout.jpg";

const BackgroundSession = () => {
  return (
    <section
      className="relative h-full bg-cover bg-center flex items-center justify-center text-center text-white"
      style={{ backgroundImage: `url(${backgroundAbout})` }}
    >
      <div className="bg-black bg-opacity-50 p-6 rounded">
        <h1 className="text-5xl font-bold mb-4">Về chúng tôi</h1>
        <p className="text-lg max-w-2xl mx-auto">
          We’re all about people because God is all about people. One of the ways we express our love for Him is
          through our love for people.
        </p>
      </div>
    </section>
  );
};

export default BackgroundSession;
