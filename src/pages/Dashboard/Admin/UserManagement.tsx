import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../features/store';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
} from '@mui/material';
import { UserRole } from '../../../types/Auth/User.type';
import Pagination from '../../../components/common/Pagination';
import { getAllUser } from '../../../features/User/userThunks';
import { setCurrentPage } from '../../../features/User/userSlice';

const getRoleLabel = (role: string | UserRole) => {
    const roleString = typeof role === 'string' ? role : role.toString();

    switch (roleString) {
        case 'Admin':
        case UserRole.Admin.toString():
            return 'Admin';
        case 'Supplier':
        case UserRole.Supplier.toString():
            return 'Nhà cung cấp';
        case 'Customer':
        case UserRole.Customer.toString():
            return 'Khách hàng';
        case 'Inspector':
        case UserRole.Inspector.toString():
            return 'Kiểm duyệt';
        default:
            return roleString || 'Unknown';
    }
};

const UserManagement: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error, filter } = useSelector((state: RootState) => state.user);

    // Gọi API chỉ khi mount lần đầu
    useEffect(() => {
        dispatch(getAllUser({
            page: filter.page,
            page_size: filter.page_size,
            search: filter.search,
        }));
        // eslint-disable-next-line
    }, []);

    const handlePageChange = (page: number) => {
        if (page < 1) return; // Không cho phép page nhỏ hơn 1
        console.log('page', page);
        dispatch(setCurrentPage(page));
        dispatch(getAllUser({
            page: page,
            page_size: filter.page_size,
            search: filter.search,
        }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const hasUsers = users?.content && users.content.length > 0;
    const showPagination = users?.page_count && users.page_count > 1;

    return (
        <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Người dùng
                </Typography>
            </Box>


            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                <CardContent sx={{ p: 0 }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
                            <CircularProgress color="primary" />
                        </Box>
                    ) : error ? (
                        <Box sx={{ textAlign: 'center', py: 8, color: 'error.main' }}>
                            <Typography variant="h6" gutterBottom>
                                {error}
                            </Typography>
                        </Box>
                    ) : !hasUsers ? (
                        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                            <Typography variant="h6" gutterBottom>
                                Không có người dùng nào.
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Không có người dùng nào.
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 'none' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ background: '#f3f4f6' }}>
                                            <TableCell>Tên người dùng</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Vai trò</TableCell>
                                            <TableCell align="center">Số điện thoại</TableCell>
                                            <TableCell>Địa chỉ</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.content.map((user) => (
                                            <TableRow key={user.id} hover sx={{ transition: 'background 0.2s', cursor: 'pointer' }}>
                                                <TableCell>
                                                    <Typography fontWeight={600} color="text.primary" noWrap>
                                                        {user.user_name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>
                                                    <Typography color="primary" fontWeight={500}>{getRoleLabel(user.role)}</Typography>
                                                </TableCell>
                                                <TableCell align="center">{user.phone_number || 'N/A'}</TableCell>
                                                <TableCell>{user.address}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {showPagination && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', py: 3, borderTop: '1px solid #e5e7eb' }}>
                                    <Pagination
                                        currentPage={users.current_page}
                                        pageCount={users.page_count}
                                        pageSize={users.page_size}
                                        itemCount={users.item_amount}
                                        onPageChange={handlePageChange}
                                    />
                                </Box>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default UserManagement;
