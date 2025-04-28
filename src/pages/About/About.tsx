
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <div className="min-h-screen m-5 bg-green-100 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">Này là trang about</h1>
      <Link to="/">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
          Đi tới trang home 
        </button>
      </Link>       
    </div>
    
  );
};

export default About;
