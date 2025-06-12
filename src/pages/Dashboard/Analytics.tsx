//import { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    // Cell
} from 'recharts';
import {
    TrendingUp,
    Users,
    Calendar,
    DollarSign,
    ArrowUp,
    ArrowDown
} from 'lucide-react';

// Mock data
const monthlyRevenue = [
    { name: 'T1', revenue: 4000 },
    { name: 'T2', revenue: 3000 },
    { name: 'T3', revenue: 5000 },
    { name: 'T4', revenue: 2780 },
    { name: 'T5', revenue: 1890 },
    { name: 'T6', revenue: 2390 },
    { name: 'T7', revenue: 3490 },
    { name: 'T8', revenue: 4000 },
    { name: 'T9', revenue: 3200 },
    { name: 'T10', revenue: 2800 },
    { name: 'T11', revenue: 4300 },
    { name: 'T12', revenue: 5000 },
];

const eventTypes = [
    { name: 'Đám cưới', value: 400 },
    { name: 'Hội nghị', value: 300 },
    { name: 'Sinh nhật', value: 300 },
    { name: 'Sự kiện công ty', value: 200 },
];

//const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const customerSatisfaction = [
    { name: 'T1', satisfaction: 4.2 },
    { name: 'T2', satisfaction: 4.5 },
    { name: 'T3', satisfaction: 4.3 },
    { name: 'T4', satisfaction: 4.7 },
    { name: 'T5', satisfaction: 4.4 },
    { name: 'T6', satisfaction: 4.6 },
];

const Analytics = () => {
    //const [timeRange, setTimeRange] = useState('month');

    const stats = [
        {
            title: 'Doanh thu',
            value: '₫45.2M',
            change: '+12.5%',
            trend: 'up',
            icon: <DollarSign className="h-6 w-6" />,
        },
        {
            title: 'Khách hàng mới',
            value: '245',
            change: '+8.2%',
            trend: 'up',
            icon: <Users className="h-6 w-6" />,
        },
        {
            title: 'Nhà cung cấp',
            value: '245',
            change: '+8.2%',
            trend: 'up',
            icon: <Users className="h-6 w-6" />,
        },
        {
            title: 'Sự kiện',
            value: '120',
            change: '-2.4%',
            trend: 'down',
            icon: <Calendar className="h-6 w-6" />,
        },
        {
            title: 'Tăng trưởng',
            value: '15.8%',
            change: '+3.1%',
            trend: 'up',
            icon: <TrendingUp className="h-6 w-6" />,
        },
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Thống kê</h1>
                <p className="text-gray-600">Tổng quan về hoạt động của hệ thống</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                {stat.icon}
                            </div>
                            <span
                                className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {stat.trend === 'up' ? (
                                    <ArrowUp className="h-4 w-4 mr-1" />
                                ) : (
                                    <ArrowDown className="h-4 w-4 mr-1" />
                                )}
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                            {stat.value}
                        </h3>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Doanh thu theo tháng
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyRevenue}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Customer Satisfaction Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Mức độ hài lòng của khách hàng
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={customerSatisfaction}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 5]} />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="satisfaction"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Event Types Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Phân loại sự kiện
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={eventTypes}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {/* {eventTypes.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))} */}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Hoạt động gần đây
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div
                                key={item}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <Calendar className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Sự kiện mới #{item}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Đã được tạo bởi Admin
                                        </p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">2 giờ trước</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics; 