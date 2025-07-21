interface BlogCardProps {
  imageUrl: string;
  category: string;
  date: string;
  title: string;
  description: string;
}

const BlogCard = ({ imageUrl, category, date, title, description }: BlogCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-xs text-blue-600 font-medium">{category}</p>
        <p className="text-xs text-gray-500 mb-2">{date}</p>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>
        <button className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
          Read Now
        </button>
      </div>
    </div>
  );
};
export default BlogCard;
