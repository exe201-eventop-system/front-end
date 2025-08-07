import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../features/store';
import { getTransaction, getRevenue } from '../../../features/Cart/cartThunk';
import { selectTransactions, selectTransactionLoading, selectTransactionError } from '../../../features/Cart/transactionSlice';
import { TransactionDTOs } from '../../../types/Transaction/Payment.types';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Transaction: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const transactions = useSelector(selectTransactions);
    const loading = useSelector(selectTransactionLoading);
    const error = useSelector(selectTransactionError);
    const [openRows, setOpenRows] = useState<number[]>([]);
    const [tab, setTab] = useState<'transaction' | 'revenue'>('transaction');

    const revenueData = useSelector((state: any) => state.transaction.revenue);

    // Sắp xếp giao dịch theo thời gian mới nhất trước
    const sortedTransactions = transactions ? [...transactions].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) : [];

    useEffect(() => {
        dispatch(getTransaction());
        dispatch(getRevenue());
    }, [dispatch]);

    const toggleRow = (orderCode: number) => {
        setOpenRows((prev) =>
            prev.includes(orderCode)
                ? prev.filter((code) => code !== orderCode)
                : [...prev, orderCode]
        );
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4  ">Tài chính</h2>
            <div className="flex space-x-4 mb-6">
                <button
                    className={`px-4 py-2 rounded ${tab === 'transaction' ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setTab('transaction')}
                >
                    Giao dịch
                </button>
                <button
                    className={`px-4 py-2 rounded ${tab === 'revenue' ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setTab('revenue')}
                >
                    Doanh thu
                </button>
            </div>
            {tab === 'transaction' && (
                <>
                    <h2 className="text-2xl font-bold mb-4">Lịch sử giao dịch</h2>
                    {loading && <div>Đang tải...</div>}
                    {error && <div className="text-red-500">{error}</div>}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-2 py-2 border text-center"></th>
                                    <th className="px-4 py-2 border">Mã đơn</th>
                                    <th className="px-4 py-2 border">Khách hàng</th>
                                    <th className="px-4 py-2 border">Giá</th>
                                    <th className="px-4 py-2 border">Trạng thái</th>
                                    <th className="px-4 py-2 border">Ngày tạo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedTransactions && sortedTransactions.length > 0 ? (
                                    sortedTransactions.map((tran: TransactionDTOs) => (
                                        <React.Fragment key={tran.orderCode}>
                                            <tr
                                                className="hover:bg-gray-50 transition cursor-pointer"
                                                onClick={() => toggleRow(tran.orderCode)}
                                            >
                                                <td className="px-2 py-2 border text-center align-middle">
                                                    {openRows.includes(tran.orderCode) ? (
                                                        <FaChevronDown className="inline text-gray-500" />
                                                    ) : (
                                                        <FaChevronRight className="inline text-gray-400" />
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 border font-semibold text-blue-700">{tran.orderCode}</td>
                                                <td className="px-4 py-2 border">{tran.customerName || '-'}</td>
                                                <td className="px-4 py-2 border text-right">{tran.price?.toLocaleString() || '-'}</td>
                                                <td className="px-4 py-2 border">
                                                    {typeof tran.status === 'boolean' ? (
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${tran.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{tran.status ? 'Thành công' : 'Thất bại'}</span>
                                                    ) : (
                                                        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">{tran.status || '-'}</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 border">{new Date(tran.createdAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</td>
                                            </tr>
                                            {openRows.includes(tran.orderCode) && (
                                                <tr>
                                                    <td colSpan={7} className="bg-gray-50 border-b">
                                                        <div className="p-3">
                                                            {tran.supplierName && (
                                                                <div className="mb-2 text-sm text-gray-600">
                                                                    <span className="font-semibold text-gray-700">Nhà cung cấp:</span> {tran.supplierName}
                                                                </div>
                                                            )}
                                                            <div className="font-semibold mb-2 text-gray-700">Dịch vụ trong giao dịch:</div>
                                                            {tran.transactionItems && tran.transactionItems.length > 0 ? (
                                                                <table className="min-w-full border border-gray-200 bg-white text-xs rounded">
                                                                    <thead className="bg-gray-100">
                                                                        <tr>
                                                                            <th className="px-2 py-1 border">Tên dịch vụ</th>
                                                                            <th className="px-2 py-1 border">Nhà cung cấp</th>
                                                                            <th className="px-2 py-1 border">Đơn giá</th>
                                                                            <th className="px-2 py-1 border">Ngày tạo</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {tran.transactionItems.map((item, idx) => (
                                                                            <tr key={idx} className="hover:bg-blue-50 text-center">
                                                                                <td className="px-2 py-1 border font-medium text-gray-800">{item.serviceName || '-'}</td>
                                                                                <td className="px-2 py-1 border text-blue-700">{item.supplierName || '-'}</td>
                                                                                <td className="px-2 py-1 border text-blue-700">
                                                                                    {item.unitPrice?.toLocaleString() || '-'}
                                                                                </td>
                                                                                <td className="px-2 py-1 border">{new Date(item.createdAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            ) : (
                                                                <span className="text-gray-400">Không có dịch vụ nào</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="text-center py-4">Không có giao dịch nào</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            {tab === 'revenue' && (
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Doanh thu theo tháng</h3>
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis tickFormatter={(v) => v.toLocaleString()} />
                                <Tooltip formatter={(value) => value.toLocaleString()} />
                                <Legend />
                                <Bar dataKey="revenue" fill="#8884d8" name="Doanh thu" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transaction;
