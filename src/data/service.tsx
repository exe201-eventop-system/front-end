export const mockServices = [
    {
        id: '3d5f8b2b-5c16-4f6d-9d1e-28f334b9c6ea',
        name: 'Tổ Chức Sự Kiện',
        description: 'Chúng tôi cung cấp dịch vụ tổ chức sự kiện chuyên nghiệp, từ concept đến thực hiện.',
        price: 5000000,
        category: 'Sự kiện',
        thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        supplier: {
            name: 'EventPro Solutions',
            rating: 4.8,
            reviews: 156,
            location: 'Hà Nội',
            verified: true
        }
    },
    {
        id: '3d5f8b2b-5c16-4f6d-9d1e-28f334b9c6ea',
        name: 'Trang Trí Sân Khấu',
        description: 'Thiết kế và trang trí sân khấu độc đáo, phù hợp với từng loại sự kiện.',
        price: 3000000,
        category: 'Trang trí',
        thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        supplier: {
            name: 'Decor Master',
            rating: 4.6,
            reviews: 89,
            location: 'TP.HCM',
            verified: true
        }
    },
    {
        id: '3d5f8b2b-5c16-4f6d-9d1e-28f334b9c6ea',
        name: 'Âm Thanh Ánh Sáng',
        description: 'Hệ thống âm thanh và ánh sáng chuyên nghiệp cho mọi quy mô sự kiện.',
        price: 4000000,
        category: 'Âm thanh',
        thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        supplier: {
            name: 'Sound & Light Pro',
            rating: 4.9,
            reviews: 203,
            location: 'Đà Nẵng',
            verified: true
        }
    },
    {
        id: '3d5f8b2b-5c16-4f6d-9d1e-28f334b9c6ea',
        name: 'Catering',
        description: 'Dịch vụ ăn uống cao cấp với thực đơn đa dạng, phù hợp mọi sự kiện.',
        price: 10000000,
        category: 'Ẩm thực',
        thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        supplier: {
            name: 'Gourmet Catering',
            rating: 4.7,
            reviews: 178,
            location: 'Hà Nội',
            verified: true
        }
    },
    {
        id: '3d5f8b2b-5c16-4f6d-9d1e-28f334b9c6ea',
        name: 'MC Chuyên Nghiệp',
        description: 'Đội ngũ MC chuyên nghiệp, giàu kinh nghiệm trong mọi loại sự kiện.',
        price: 2000000,
        category: 'Nhân sự',
        thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        supplier: {
            name: 'MC Pro Team',
            rating: 4.8,
            reviews: 145,
            location: 'TP.HCM',
            verified: true
        }
    },
];

// Categories for filter
export const categories = ['Tất cả', 'Sự kiện', 'Trang trí', 'Âm thanh', 'Ẩm thực', 'Nhân sự'];

// Price ranges for filter
export const priceRanges = [
    { label: 'Tất cả', min: 0, max: Infinity },
    { label: 'Dưới 3 triệu', min: 0, max: 3000000 },
    { label: '3 - 5 triệu', min: 3000000, max: 5000000 },
    { label: '5 - 10 triệu', min: 5000000, max: 10000000 },
    { label: 'Trên 10 triệu', min: 10000000, max: Infinity },
];
