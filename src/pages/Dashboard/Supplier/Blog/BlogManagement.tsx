import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Blogs } from '../../../../features/Blogs/blogThunks';
import { RootState } from '../../../../features/store';
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
    IconButton,
    Tooltip,
    CircularProgress,
    Avatar,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { format } from 'date-fns';

const BlogManagement = () => {
    const dispatch = useDispatch();
    const { blogs, loading } = useSelector((state: RootState) => state.blog);

    useEffect(() => {
        // @ts-ignore
        dispatch(Blogs());
    }, [dispatch]);

    return (
        <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
                <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
                    Quản lý Bài viết
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    size="large"
                    sx={{ borderRadius: 3, fontWeight: 600, px: 3, boxShadow: 2 }}
                >
                    Tạo Blog mới
                </Button>
            </Box>
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                <CardContent sx={{ p: 0 }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
                            <CircularProgress color="primary" />
                        </Box>
                    ) : blogs.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                            <Typography variant="h6" gutterBottom>
                                Không có blog nào.
                            </Typography>
                            <Typography variant="body2">Hãy nhấn "Tạo Blog mới" để thêm bài viết đầu tiên!</Typography>
                        </Box>
                    ) : (
                        <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 'none' }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ background: '#f3f4f6' }}>
                                        <TableCell width={100}>Ảnh</TableCell>
                                        <TableCell>Tiêu đề</TableCell>
                                        <TableCell>Mô tả</TableCell>
                                        <TableCell>Ngày tạo</TableCell>
                                        <TableCell>Cập nhật</TableCell>
                                        <TableCell align="center">Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {blogs.map((blog) => (
                                        <TableRow
                                            key={blog.id}
                                            hover
                                            sx={{ transition: 'background 0.2s', cursor: 'pointer' }}
                                        >
                                            <TableCell>
                                                {blog.thumbnail ? (
                                                    <Avatar
                                                        variant="rounded"
                                                        src={blog.thumbnail}
                                                        alt={blog.title}
                                                        sx={{ width: 64, height: 40, borderRadius: 2, boxShadow: 1 }}
                                                    />
                                                ) : (
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{ width: 64, height: 40, borderRadius: 2, bgcolor: 'grey.200', color: 'grey.500', fontSize: 14 }}
                                                    >
                                                        No Image
                                                    </Avatar>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontWeight={600} color="text.primary" noWrap>
                                                    {blog.title}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="text.secondary" sx={{ maxWidth: 240 }} noWrap>
                                                    {blog.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {blog.created_at ? format(new Date(blog.created_at), 'dd/MM/yyyy') : '-'}
                                            </TableCell>
                                            <TableCell>
                                                {blog.update_at ? format(new Date(blog.update_at), 'dd/MM/yyyy') : '-'}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="Xem chi tiết" arrow>
                                                    <IconButton color="info">
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Chỉnh sửa" arrow>
                                                    <IconButton color="primary">
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Xoá" arrow>
                                                    <IconButton color="error">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default BlogManagement; 