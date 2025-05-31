import { Link } from 'react-router-dom';
const ContentSession =() =>{
return <>
<section className="py-16 bg-white text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Love. Belonging. Identity. Justice.</h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        {/* Thêm nội dung chi tiết tại đây nếu có */}
        We strive to create a community where everyone feels loved and valued.
      </p>
            <Link to="/">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
          Đi tới trang home 
        </button>
      </Link> 
    </section>
</>
}
export default ContentSession;