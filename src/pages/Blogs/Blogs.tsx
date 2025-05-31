import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, Tag, Search } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  image: string;
  date: string;
  readTime: string;
  likes: number;
  comments: number;
}

// Mock data
const mockBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Xu hướng tổ chức sự kiện trực tuyến năm 2024",
    excerpt: "Khám phá những xu hướng mới nhất trong lĩnh vực tổ chức sự kiện trực tuyến và cách áp dụng chúng vào doanh nghiệp của bạn.",
    content: "Nội dung chi tiết của bài viết...",
    author: {
      name: "Nguyễn Văn A",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    category: "Xu hướng",
    tags: ["Sự kiện trực tuyến", "Digital Event", "2024"],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "15/03/2024",
    readTime: "5 phút",
    likes: 120,
    comments: 15
  },
  {
    id: "2",
    title: "Cách tạo trải nghiệm thực tế ảo cho sự kiện",
    excerpt: "Hướng dẫn chi tiết về cách tích hợp công nghệ thực tế ảo vào các sự kiện để tạo trải nghiệm độc đáo cho người tham gia.",
    content: "Nội dung chi tiết của bài viết...",
    author: {
      name: "Trần Thị B",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    category: "Công nghệ",
    tags: ["VR", "AR", "Thực tế ảo"],
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "14/03/2024",
    readTime: "7 phút",
    likes: 85,
    comments: 12
  },
  {
    id: "3",
    title: "Bí quyết marketing sự kiện hiệu quả",
    excerpt: "Những chiến lược marketing sáng tạo giúp thu hút đông đảo người tham gia cho sự kiện của bạn.",
    content: "Nội dung chi tiết của bài viết...",
    author: {
      name: "Lê Văn C",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    category: "Marketing",
    tags: ["Marketing", "Chiến lược", "Sự kiện"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "13/03/2024",
    readTime: "6 phút",
    likes: 150,
    comments: 20
  },
  {
    id: "4",
    title: "Bí quyết marketing sự kiện hiệu quả",
    excerpt: "Những chiến lược marketing sáng tạo giúp thu hút đông đảo người tham gia cho sự kiện của bạn.",
    content: "Nội dung chi tiết của bài viết...",
    author: {
      name: "Lê Văn C",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    category: "Marketing",
    tags: ["Marketing", "Chiến lược", "Sự kiện"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "13/03/2024",
    readTime: "6 phút",
    likes: 150,
    comments: 20
  }
];

const categories = ["Tất cả", "Xu hướng", "Công nghệ", "Marketing", "Kinh nghiệm"];

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = mockBlogs.filter(blog => {
    const matchesCategory = selectedCategory === "Tất cả" || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog & Tin tức</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá những bài viết mới nhất về tổ chức sự kiện, xu hướng công nghệ và kinh nghiệm thực tế
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="w-full px-4 py-2 pl-10 bg-white border border-purple-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-purple-50 border border-purple-200"
                  }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blogs/${blog.id}`}
              className="group bg-white rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full shadow-sm">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-6 h-6 rounded-full border-2 border-purple-100"
                    />
                    <span>{blog.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tag className="w-4 h-4" />
                      <span>{blog.tags[0]}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <span className="text-purple-600">{blog.likes}</span>
                      <span>lượt thích</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="text-purple-600">{blog.comments}</span>
                      <span>bình luận</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Không tìm thấy bài viết nào phù hợp với tìm kiếm của bạn
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
