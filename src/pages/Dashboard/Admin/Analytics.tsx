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
    // Cell
} from 'recharts';
import {
    TrendingUp,
    Users,
    DollarSign,
    Building2,
    Newspaper,
    PackageSearch
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDashboard } from "../../../features/Dashboard/dashboardThunk";
import { AppDispatch } from "../../../features/store";

// Hàm chuyển đổi dữ liệu từ response sang analyticsData cho UI
function getAnalyticsDataFromResponse(response: any) {
    // Stats
    const stats = [
        { title: 'Doanh thu', value: `₫${response.lifetime.lifetime_revenue.toLocaleString()}` },
        { title: 'Lượt thuê', value: response.lifetime.used_service_count.toString() },
        { title: 'Khách hàng', value: response.lifetime.customer_count.toString() },
        { title: 'Nhà cung cấp', value: response.lifetime.supplier_count.toString() },
        { title: 'Dịch vụ', value: response.lifetime.service_count.toString() },
        { title: 'Bài viết', value: response.lifetime.blog_count.toString() },
    ];
    // Monthly Revenue
    // Đảm bảo luôn có đủ 12 tháng (T1-T12)
    const monthMap: Record<number, number> = {};
    if (response.yearly && response.yearly.data_month) {
        response.yearly.data_month.forEach((item: any) => {
            monthMap[item.month] = item.data.lifetime_revenue;
        });
    }
    const monthlyRevenue = Array.from({ length: 12 }, (_, i) => ({
        name: `T${i + 1}`,
        revenue: monthMap[i + 1] ?? 0,
    }));
    // User Growth (real or empty)
    const userGrowth = (response.yearly && response.yearly.data_month && response.yearly.data_month.length > 0)
        ? response.yearly.data_month.map((item: any) => ({
            month: `T${item.month}`,
            Customer: item.data.customer_count ?? 0,
        }))
        : [];
    // Supplier Growth (real or empty)
    const supplierGrowth = (response.yearly && response.yearly.data_month && response.yearly.data_month.length > 0)
        ? response.yearly.data_month.map((item: any) => ({
            month: `T${item.month}`,
            Supplier: item.data.supplier_count ?? 0,
        }))
        : [];
    // Event Types (real or empty)
    const eventTypes = (response.event_types && response.event_types.length > 0)
        ? response.event_types.map((et: any) => ({
            name: et.name,
            value: et.value,
        }))
        : [];
    // Top Services
    const topServices = (response.most_rated_service && response.most_rated_service.length > 0)
        ? response.most_rated_service.map((s: any) => ({
            name: s.service_name,
            rental_count: s.uses_count,
        }))
        : [];
    // Least Rated Services (real or empty)
    const leastRatedServices = (response.least_rated_service && response.least_rated_service.length > 0)
        ? response.least_rated_service.map((s: any) => ({
            name: s.service_name,
            rental_count: s.uses_count,
        }))
        : [];
    return {
        stats,
        monthlyRevenue,
        userGrowth,
        supplierGrowth,
        eventTypes,
        topServices,
        leastRatedServices,
    };
}

const statIconMap: { [key: string]: React.ReactNode } = {
    'Doanh thu': <DollarSign className="h-6 w-6" />,
    'Lượt thuê': <TrendingUp className="h-6 w-6" />,
    'Khách hàng': <Users className="h-6 w-6" />,
    'Nhà cung cấp': <Building2 className="h-6 w-6" />,
    'Dịch vụ': <PackageSearch className="h-6 w-6" />,
    'Bài viết': <Newspaper className="h-6 w-6" />,
};


const Analytics = () => {
    const dispatch = useDispatch<AppDispatch>();
    const dashboard = useSelector((state: any) => state.dashboard?.data);
    const loading = useSelector((state: any) => state.dashboard?.loading);
    const error = useSelector((state: any) => state.dashboard?.error);

    console.log('DEBUG loading:', loading, 'dashboard:', dashboard);

    useEffect(() => {
        dispatch(getDashboard());
    }, [dispatch]);

    if (loading || !dashboard) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    const analyticsData = getAnalyticsDataFromResponse(dashboard);
    const monthlyRevenue = analyticsData.monthlyRevenue;
    const userGrowth = analyticsData.userGrowth;
    const supplierGrowth = analyticsData.supplierGrowth;
    const top_services = analyticsData.topServices;
    const least_rated_services = analyticsData.leastRatedServices;


    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Thống kê</h1>
                <p className="text-gray-600">Tổng quan về hoạt động của hệ thống</p>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ">
                {analyticsData.stats.map((stat, index) => {
                    const icon = statIconMap[stat.title] || <TrendingUp className="h-6 w-6" />;
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between"
                        >
                            <div className="p-3 rounded-full p-2 bg-purple-100 rounded-lg">{icon}</div>
                            <div className="flex-1 ml-4">
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                <p className="text-sm text-gray-600">{stat.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Dịch vụ được thuê nhiều nhất</h3>
                    <table className="min-w-full text-left text-sm">
                        <thead>
                            <tr>
                                <th className="py-2 px-4">Tên dịch vụ</th>
                                <th className="py-2 px-4">Số lượt thuê</th>
                            </tr>
                        </thead>
                        <tbody>
                            {top_services.length === 0 ? <tr><td colSpan={2}>Không có dữ liệu</td></tr> : top_services.map((service: any, idx: number) => (
                                <tr key={idx}>
                                    <td className="py-2 px-4">{service.name}</td>
                                    <td className="py-2 px-4 font-bold">{service.rental_count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Dịch vụ được thuê ít nhất</h3>
                    <table className="min-w-full text-left text-sm">
                        <thead>
                            <tr>
                                <th className="py-2 px-4">Tên dịch vụ</th>
                                <th className="py-2 px-4">Số lượt thuê</th>
                            </tr>
                        </thead>
                        <tbody>
                            {least_rated_services.length === 0 ? <tr><td colSpan={2}>Không có dữ liệu</td></tr> : least_rated_services.map((service: any, idx: number) => (
                                <tr key={idx}>
                                    <td className="py-2 px-4">{service.name}</td>
                                    <td className="py-2 px-4 font-bold">0</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Doanh thu theo tháng
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyRevenue}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" interval={0} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {monthlyRevenue.every((item: any) => item.revenue === 0) && (
                        <div className="text-center text-gray-500 mt-2 text-sm">Tất cả các giá trị đều là 0 trong năm nay.</div>
                    )}
                </div>
            </div>
            {/* Supplier Growth Chart - full width */}
            <div className="mt-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Tăng trưởng nhà cung cấp theo tháng
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={supplierGrowth}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" interval={0} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="Supplier"
                                    stroke="#f59e42"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    {supplierGrowth.every((item: any) => item.Supplier === 0) && (
                        <div className="text-center text-gray-500 mt-2 text-sm">Tất cả các giá trị đều là 0 trong năm nay.</div>
                    )}
                </div>
            </div>
            {/* User Growth Chart - full width */}
            <div className="mt-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Biểu đồ tăng trưởng người dùng
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userGrowth}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" interval={0} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="Customer"
                                    stroke="#34d399"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    {userGrowth.every((item: any) => item.Customer === 0) && (
                        <div className="text-center text-gray-500 mt-2 text-sm">Tất cả các giá trị đều là 0 trong năm nay.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics; 