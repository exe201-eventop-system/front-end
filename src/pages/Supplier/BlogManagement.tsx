import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Visibility as VisibilityIcon,
} from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface BlogPost {
    id: number;
    title: string;
    content: string;
    status: 'draft' | 'published';
    publishDate?: string;
    views: number;
}

const BlogManagement = () => {
    const [open, setOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [posts, setPosts] = useState<BlogPost[]>([
        {
            id: 1,
            title: 'Tips for Perfect Wedding Photography',
            content: 'Learn the best practices for capturing beautiful wedding moments...',
            status: 'published',
            publishDate: '2024-03-15',
            views: 150,
        },
        {
            id: 2,
            title: 'Event Planning Essentials',
            content: 'A comprehensive guide to successful event planning...',
            status: 'draft',
            views: 0,
        },
    ]);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingPost(null);
        setFormData({
            title: '',
            content: '',
        });
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            content: post.content,
        });
        setOpen(true);
    };

    const handleDelete = (id: number) => {
        setPosts(posts.filter((post) => post.id !== id));
    };

    const handlePublish = (id: number) => {
        setPosts(
            posts.map((post) =>
                post.id === id
                    ? {
                        ...post,
                        status: 'published',
                        publishDate: new Date().toISOString().split('T')[0],
                    }
                    : post
            )
        );
    };

    const handleSubmit = () => {
        if (editingPost) {
            // Update existing post
            setPosts(
                posts.map((post) =>
                    post.id === editingPost.id
                        ? {
                            ...post,
                            title: formData.title,
                            content: formData.content,
                        }
                        : post
                )
            );
        } else {
            // Add new post
            const newPost: BlogPost = {
                id: posts.length + 1,
                title: formData.title,
                content: formData.content,
                status: 'draft',
                views: 0,
            };
            setPosts([...posts, newPost]);
        }
        handleClose();
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Blog Management</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleClickOpen}
                >
                    Create New Post
                </Button>
            </Box>

            <Card>
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Publish Date</TableCell>
                                    <TableCell>Views</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {posts.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell>{post.title}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={post.status}
                                                color={post.status === 'published' ? 'success' : 'default'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{post.publishDate || '-'}</TableCell>
                                        <TableCell>{post.views}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEdit(post)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(post.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton color="info">
                                                <VisibilityIcon />
                                            </IconButton>
                                            {post.status === 'draft' && (
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => handlePublish(post.id)}
                                                    sx={{ ml: 1 }}
                                                >
                                                    Publish
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Content
                                </Typography>
                                <ReactQuill
                                    theme="snow"
                                    value={formData.content}
                                    onChange={(content) =>
                                        setFormData({ ...formData, content })
                                    }
                                    style={{ height: '300px', marginBottom: '50px' }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingPost ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default BlogManagement; 