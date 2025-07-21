import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../features/store';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    TextField,
    InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { UserRole } from '../../../types/Auth/User.type';
import Pagination from '../../../components/common/Pagination';
import { getAllUser } from '../../../features/User/userThunks';
import { setCurrentPage, setSearchTerm } from '../../../features/User/userSlice';

const getRoleLabel = (role: string | UserRole) => {
    // Xử lý cả string và enum
    const roleString = typeof role === 'string' ? role : role.toString();

    switch (roleString) {
        case 'Admin':
        case UserRole.Admin.toString():
            return 'Admin';
        case 'Supplier':
        case UserRole.Supplier.toString():
            return 'Supplier';
        case 'Customer':
        case UserRole.Customer.toString():
            return 'Customer';
        case 'Inspector':
        case UserRole.Inspector.toString():
            return 'Inspector';
        default:
            return roleString || 'Unknown';
    }
};

const UserManagement: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error, filter } = useSelector((state: RootState) => state.user);
    const [searchValue, setSearchValue] = useState('');

    // Debug logs
    console.log('=== UserManagement Render ===');
    console.log('Users state:', users);
    console.log('Pagination info:', {
        current_page: users?.current_page,
        page_count: users?.page_count,
        page_size: users?.page_size,
        item_amount: users?.item_amount,
        content_length: users?.content?.length
    });

    useEffect(() => {
        console.log('=== useEffect triggered ===');
        console.log('Filter:', filter);
        dispatch(getAllUser({
            page: filter.page,
            page_size: filter.page_size,
            search: filter.search,
        }));
    }, [dispatch, filter.page, filter.page_size, filter.search]);

    const handlePageChange = (page: number) => {
        console.log('Page change to:', page);
        dispatch(setCurrentPage(page));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
    };

    const handleSearchSubmit = () => {
        console.log('Search submitted:', searchValue);
        dispatch(setSearchTerm(searchValue));
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    // Kiểm tra điều kiện hiển thị
    const hasUsers = users?.content && users.content.length > 0;
    const showPagination = users?.page_count && users.page_count > 1;

    console.log('Render conditions:', { hasUsers, showPagination, loading, error });

    return (
        <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
                <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
                    Người dùng hệ thống
                </Typography>
            </Box>

            {/* Search Bar */}
            <Card sx={{ borderRadius: 4, boxShadow: 3, mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            placeholder="Tìm kiếm người dùng theo tên, email..."
                            value={searchValue}
                            onChange={handleSearchChange}
                            onKeyPress={handleKeyPress}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ flexGrow: 1 }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSearchSubmit}
                            sx={{
                                borderRadius: 2,
                                fontWeight: 600,
                                px: 3,
                                py: 1.5,
                                minWidth: 120
                            }}
                        >
                            Tìm kiếm
                        </Button>
                    </Box>
                </CardContent>
            </Card>

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
                                Debug Info:
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                                Users: {JSON.stringify(users, null, 2)}
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            {/* Pagination Info */}
                            <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Hiển thị {users.content.length} người dùng (Trang {users.current_page}/{users.page_count} - Tổng {users.item_amount} người dùng)
                                </Typography>
                            </Box>

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

                            {/* Pagination */}
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
