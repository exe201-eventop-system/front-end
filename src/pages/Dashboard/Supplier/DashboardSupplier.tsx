import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {
    DollarSign,
    Newspaper,
    PackageSearch,
} from 'lucide-react';
import { JSX, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../features/store';
import { getDashboardSupplier } from '../../../features/Dashboard/dashboardThunk';
import { DashboardStatDTO, MonthlyRevenueDTO } from '../../../types/Dashboard/analysis';

const DashboardSupplier = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<DashboardStatDTO[]>([]);
    const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenueDTO[]>([]);

    useEffect(() => {
        const fetchDashboard = async () => {
            setLoading(true);
            const action: any = await dispatch(getDashboardSupplier());
            if (action.payload && action.payload.data) {
                setStats(action.payload.data.stats);
                setMonthlyRevenue(action.payload.data.monthlyRevenue);
            }
            setLoading(false);
        };
        fetchDashboard();
    }, [dispatch]);

    if (loading) {
        return <div className="text-center py-20 text-xl text-gray-600">Đang tải dữ liệu thống kê...</div>;
    }
    const getIcon = (title: string): JSX.Element => {
        switch (title) {
            case 'Doanh thu':
                return <DollarSign className="h-6 w-6" />;
            case 'Dịch vụ':
                return <PackageSearch className="h-6 w-6" />;
            case 'Blog':
                return <Newspaper className="h-6 w-6" />;
            default:
                return <></>;
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Thống kê</h1>
                <p className="text-gray-600">Tổng quan về hoạt động của hệ thống</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center w-full">
                                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                                    {getIcon(stat.name)}
                                </div>
                                <span className="text-sm text-gray-600 font-semibold">{stat.name}</span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                            {stat.value}
                        </h3>
                    </div>
                ))}
            </div>

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
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardSupplier;
