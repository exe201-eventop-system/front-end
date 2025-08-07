import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../features/store';
import { getServcielIstSupplier, createProduct, uploadImageProduct, deleteProduct } from '../../../../features/Services/serviceThunks';
import { getCategory } from '../../../../features/Category/categoryThunk';
import { getPackages } from '../../../../features/Pagekages/packagesTh́unk.ts';
import { ProductSummaryItems, CreateProductCommand, UploadProductImageFormDTO } from '../../../../types/Services/Services.type';
import { CategoryResponseDto } from '../../../../types/Category/category';
import { PackageResponseDto } from '../../../../types/Packages/packages';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  CloudUpload as UploadIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Types

interface CreateProductForm {
  name: string;
  description: string;
  category_id: string;
  packages: Array<{
    packageStructure: string;
    price: number;
    overtimePrice: number;
    minimumHour: number;
  }>;
}

interface UploadImageForm {
  thumbnail?: File;
  images: File[];
}

// Validation Schemas
const productSchema = yup.object({
  name: yup.string().required('Tên sản phẩm là bắt buộc'),
  description: yup.string().required('Mô tả là bắt buộc'),
  category_id: yup.string().required('Danh mục là bắt buộc'),
  packages: yup.array().of(
    yup.object({
      packageStructure: yup.string().required('Cấu trúc gói là bắt buộc'),
      price: yup.number().positive('Giá phải dương').required('Giá là bắt buộc'),
      overtimePrice: yup.number().positive('Giá overtime phải dương').required('Giá overtime là bắt buộc'),
      minimumHour: yup.number().positive('Số giờ tối thiểu phải dương').required('Số giờ tối thiểu là bắt buộc'),
    })
  ).min(1, 'Phải có ít nhất 1 gói dịch vụ').test(
    'unique-packages',
    'Không được chọn trùng cấu trúc gói',
    function (packages) {
      if (!packages) return true;
      const packageStructures = packages.map(pkg => pkg.packageStructure).filter(Boolean);
      const uniqueStructures = new Set(packageStructures);
      return uniqueStructures.size === packageStructures.length;
    }
  )
});

const imageSchema = yup.object({
  thumbnail: yup.mixed().optional(),
  images: yup.array().of(
    yup.mixed().required('File ảnh là bắt buộc')
  ).min(1, 'Phải upload ít nhất 1 ảnh')
});

const ProductManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: categories, loading: categoriesLoading } = useSelector((state: RootState) => state.category);
  const { data: packages, loading: packagesLoading } = useSelector((state: RootState) => state.packages);
  const [products, setProducts] = useState<ProductSummaryItems[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductSummaryItems | null>(null);
  const [productToDelete, setProductToDelete] = useState<ProductSummaryItems | null>(null);
  const [createdProductId, setCreatedProductId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'info'
  });

  // Form for creating product
  const productForm = useForm<CreateProductForm>({
    resolver: yupResolver(productSchema) as any,
    defaultValues: {
      name: '',
      description: '',
      category_id: '',
      packages: [{ packageStructure: '', price: 0, overtimePrice: 0, minimumHour: 1 }]
    }
  });

  // Form for uploading images
  const imageForm = useForm<UploadImageForm>({
    resolver: yupResolver(imageSchema) as any,
    defaultValues: {
      thumbnail: undefined,
      images: []
    }
  });

  const watchedPackages = productForm.watch('packages');

  // Fetch data
  useEffect(() => {
    fetchSupplierProducts();
    fetchCategories();
    fetchPackages();
  }, [dispatch]);

  const fetchSupplierProducts = async () => {
    try {
      const result = await dispatch(getServcielIstSupplier()).unwrap();
      setProducts(result.data || []);
    } catch (error) {
      console.error('Error fetching supplier products:', error);
      showSnackbar('Lỗi khi tải danh sách sản phẩm', 'error');
    }
  };

  const fetchCategories = async () => {
    try {
      await dispatch(getCategory()).unwrap();
    } catch (error) {
      console.error('Error fetching categories:', error);
      showSnackbar('Lỗi khi tải danh mục', 'error');
    }
  };

  const fetchPackages = async () => {
    try {
      await dispatch(getPackages()).unwrap();
    } catch (error) {
      console.error('Error fetching packages:', error);
      showSnackbar('Lỗi khi tải cấu trúc gói', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setActiveStep(0);
    productForm.reset();
    imageForm.reset();
    setCreatedProductId(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActiveStep(0);
    productForm.reset();
    imageForm.reset();
    setCreatedProductId(null);
  };

  const handleViewProduct = (product: ProductSummaryItems) => {
    setSelectedProduct(product);
    setOpenViewDialog(true);
  };

  const handleDeleteProduct = (product: ProductSummaryItems) => {
    setProductToDelete(product);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      setLoading(true);
      await dispatch(deleteProduct({ id: productToDelete.id })).unwrap();
      showSnackbar('Xóa sản phẩm thành công', 'success');
      fetchSupplierProducts();
      setOpenDeleteDialog(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      showSnackbar('Lỗi khi xóa sản phẩm', 'error');
    } finally {
      setLoading(false);
    }
  };

  const cancelDeleteProduct = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  const handleOpenImageDialog = (product: ProductSummaryItems) => {
    setSelectedProduct(product);
    setOpenImageDialog(true);
  };

  const onSubmitProduct = async (data: CreateProductForm) => {
    try {
      setLoading(true);

      const createProductCommand: CreateProductCommand = {
        name: data.name,
        description: data.description,
        category_id: data.category_id,
        location: 'Thành phố Hồ Chí Minh',
        packages: data.packages
      };

      const result = await dispatch(createProduct(createProductCommand)).unwrap();
      const productId = result.data;
      if (productId) {
        setCreatedProductId(productId);
        showSnackbar('Tạo sản phẩm thành công! Bước tiếp theo: Upload ảnh', 'success');
        setActiveStep(1);
      } else {
        showSnackbar('Lỗi: Không nhận được ID sản phẩm', 'error');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      showSnackbar('Lỗi khi tạo sản phẩm', 'error');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitImages = async (data: UploadImageForm) => {
    const productId = createdProductId || selectedProduct?.id;
    if (!productId) {
      showSnackbar('Không tìm thấy ID sản phẩm', 'error');
      return;
    }

    try {
      setLoading(true);

      const uploadImageForm: UploadProductImageFormDTO = {
        productId: productId,
        thumbnail: data.thumbnail,
        images: data.images
      };

      await dispatch(uploadImageProduct(uploadImageForm)).unwrap();

      showSnackbar('Upload ảnh thành công!', 'success');
      handleCloseDialog();
      setOpenImageDialog(false);
      fetchSupplierProducts();
    } catch (error) {
      console.error('Error uploading images:', error);
      showSnackbar('Lỗi khi upload ảnh', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addPackage = () => {
    const currentPackages = productForm.watch('packages');
    const maxPackages = Array.isArray(packages) ? packages.length : 0;

    if (currentPackages.length < maxPackages) {
      productForm.setValue('packages', [
        ...currentPackages,
        { packageStructure: '', price: 0, overtimePrice: 0, minimumHour: 1 }
      ]);
    } else {
      showSnackbar(`Chỉ có thể thêm tối đa ${maxPackages} gói dịch vụ`, 'warning');
    }
  };

  const removePackage = (index: number) => {
    const currentPackages = productForm.watch('packages');
    if (currentPackages.length > 1) {
      productForm.setValue('packages', currentPackages.filter((_, i) => i !== index));
    }
  };

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      imageForm.setValue('thumbnail', file);
    }
  };

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    imageForm.setValue('images', files);
  };

  if ((loading || categoriesLoading || packagesLoading) && products.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Quản lý Dịch Vụ
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Thêm Dịch vụ
        </Button>
      </Box>

      {/* Products Grid */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 3
      }}>
        {Array.isArray(products) && products.map((product) => (
          <Card key={product.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="200"
              image={product.thumbnail || '/placeholder-image.jpg'}
              alt={product.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="h2" noWrap>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}>
                {product.description}
              </Typography>
              <Box mt={1}>
                <Chip
                  label={product.category}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
              <Box mt={1} display="flex" gap={0.5} flexWrap="wrap">
                {Array.isArray(product.package) && product.package.slice(0, 2).map((pkg, index) => (
                  <Chip
                    key={index}
                    label={`${pkg.package_name}: ${pkg.price.toLocaleString()}đ`}
                    size="small"
                    variant="outlined"
                  />
                ))}
                {Array.isArray(product.package) && product.package.length > 2 && (
                  <Chip
                    label={`+${product.package.length - 2} gói khác`}
                    size="small"
                    variant="outlined"
                  />
                )}
              </Box>
              <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  {Array.isArray(product.images) ? product.images.length : 0} ảnh
                </Typography>
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => handleViewProduct(product)}
                    color="primary"
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenImageDialog(product)}
                    color="secondary"
                  >
                    <UploadIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteProduct(product)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Create Product Dialog with Stepper */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box>
            <Typography variant="h6" gutterBottom>
              Thêm Sản phẩm Mới
            </Typography>
            <Stepper activeStep={activeStep} orientation="horizontal">
              <Step>
                <StepLabel>Thông tin cơ bản</StepLabel>
              </Step>
              <Step>
                <StepLabel>Upload ảnh</StepLabel>
              </Step>
            </Stepper>
          </Box>
        </DialogTitle>

        <DialogContent>
          {activeStep === 0 && (
            <form onSubmit={productForm.handleSubmit(onSubmitProduct)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Controller
                  name="name"
                  control={productForm.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Tên sản phẩm"
                      fullWidth
                      error={!!productForm.formState.errors.name}
                      helperText={productForm.formState.errors.name?.message}
                    />
                  )}
                />

                <Controller
                  name="description"
                  control={productForm.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Mô tả"
                      fullWidth
                      multiline
                      rows={3}
                      error={!!productForm.formState.errors.description}
                      helperText={productForm.formState.errors.description?.message}
                    />
                  )}
                />

                <Controller
                  name="category_id"
                  control={productForm.control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!productForm.formState.errors.category_id}>
                      <InputLabel>Danh mục</InputLabel>
                      <Select {...field} label="Danh mục">
                        {Array.isArray(categories) && categories.map((category: CategoryResponseDto) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {productForm.formState.errors.category_id && (
                        <Typography color="error" variant="caption">
                          {productForm.formState.errors.category_id.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />

                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">
                      Gói dịch vụ ({watchedPackages.length}/{Array.isArray(packages) ? packages.length : 0})
                    </Typography>
                    <Button
                      startIcon={<AddIcon />}
                      onClick={addPackage}
                      variant="outlined"
                      size="small"
                      disabled={watchedPackages.length >= (Array.isArray(packages) ? packages.length : 0)}
                    >
                      Thêm gói
                    </Button>
                  </Box>

                  {watchedPackages.map((_, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Controller
                          name={`packages.${index}.packageStructure`}
                          control={productForm.control}
                          render={({ field }) => (
                            <FormControl sx={{ flex: 2 }}>
                              <InputLabel>Cấu trúc gói</InputLabel>
                              <Select {...field} label="Cấu trúc gói">
                                {Array.isArray(packages) && packages
                                  .filter(pkg => {
                                    // Lọc ra các cấu trúc gói chưa được chọn hoặc đang được chọn ở index hiện tại
                                    const selectedPackages = watchedPackages.map(p => p.packageStructure).filter(Boolean);
                                    return !selectedPackages.includes(pkg.id) || pkg.id === field.value;
                                  })
                                  .map((pkg: PackageResponseDto) => (
                                    <MenuItem key={pkg.id} value={pkg.id}>
                                      {pkg.name}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          )}
                        />
                        <Controller
                          name={`packages.${index}.price`}
                          control={productForm.control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Giá"
                              type="number"
                              sx={{ flex: 1 }}
                            />
                          )}
                        />
                        <Controller
                          name={`packages.${index}.overtimePrice`}
                          control={productForm.control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Giá ngoài giờ"
                              type="number"
                              sx={{ flex: 1 }}
                            />
                          )}
                        />
                        <Controller
                          name={`packages.${index}.minimumHour`}
                          control={productForm.control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Giờ tối thiểu"
                              type="number"
                              sx={{ flex: 1 }}
                            />
                          )}
                        />
                        <IconButton
                          onClick={() => removePackage(index)}
                          color="error"
                          disabled={watchedPackages.length === 1}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </form>
          )}

          {activeStep === 1 && (
            <form onSubmit={imageForm.handleSubmit(onSubmitImages)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Upload ảnh cho sản phẩm
                </Typography>

                {/* Thumbnail Upload */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Ảnh đại diện (Thumbnail)
                  </Typography>
                  <Box
                    sx={{
                      border: '2px dashed #ccc',
                      borderRadius: 2,
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: 'primary.main',
                      },
                    }}
                    onClick={() => document.getElementById('thumbnail-upload')?.click()}
                  >
                    <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Click để chọn ảnh đại diện
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Chọn 1 ảnh làm ảnh đại diện cho sản phẩm
                    </Typography>
                    <input
                      id="thumbnail-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleThumbnailChange}
                    />
                  </Box>

                  {imageForm.watch('thumbnail') && (
                    <Box mt={2}>
                      <Typography variant="subtitle1" gutterBottom>
                        Ảnh đại diện đã chọn:
                      </Typography>
                      <Chip
                        label={imageForm.watch('thumbnail')?.name}
                        onDelete={() => {
                          imageForm.setValue('thumbnail', undefined);
                        }}
                      />
                    </Box>
                  )}
                </Box>

                {/* Multiple Images Upload */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Ảnh sản phẩm (Images)
                  </Typography>
                  <Box
                    sx={{
                      border: '2px dashed #ccc',
                      borderRadius: 2,
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: 'primary.main',
                      },
                    }}
                    onClick={() => document.getElementById('images-upload')?.click()}
                  >
                    <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Click để chọn nhiều ảnh
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Chọn nhiều ảnh cho sản phẩm
                    </Typography>
                    <input
                      id="images-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImagesChange}
                    />
                  </Box>

                  {imageForm.watch('images').length > 0 && (
                    <Box mt={2}>
                      <Typography variant="subtitle1" gutterBottom>
                        Ảnh sản phẩm đã chọn ({imageForm.watch('images').length}):
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {Array.from(imageForm.watch('images')).map((file, index) => (
                          <Chip
                            key={index}
                            label={file.name}
                            onDelete={() => {
                              const newFiles = imageForm.watch('images').filter((_, i) => i !== index);
                              imageForm.setValue('images', newFiles);
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </form>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          {activeStep === 0 && (
            <Button
              onClick={productForm.handleSubmit(onSubmitProduct)}
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : 'Tiếp theo'}
            </Button>
          )}
          {activeStep === 1 && (
            <Button
              onClick={imageForm.handleSubmit(onSubmitImages)}
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : 'Hoàn thành'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Upload Images Dialog */}
      <Dialog open={openImageDialog} onClose={() => setOpenImageDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload ảnh cho sản phẩm</DialogTitle>
        <DialogContent>
          <form onSubmit={imageForm.handleSubmit(onSubmitImages)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Sản phẩm: {selectedProduct?.name}
              </Typography>

              {/* Thumbnail Upload */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Ảnh đại diện (Thumbnail)
                </Typography>
                <Box
                  sx={{
                    border: '2px dashed #ccc',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'primary.main',
                    },
                  }}
                  onClick={() => document.getElementById('thumbnail-upload')?.click()}
                >
                  <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Click để chọn ảnh đại diện
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Chọn 1 ảnh làm ảnh đại diện cho sản phẩm
                  </Typography>
                  <input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleThumbnailChange}
                  />
                </Box>

                {imageForm.watch('thumbnail') && (
                  <Box mt={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      Ảnh đại diện đã chọn:
                    </Typography>
                    <Chip
                      label={imageForm.watch('thumbnail')?.name}
                      onDelete={() => {
                        imageForm.setValue('thumbnail', undefined);
                      }}
                    />
                  </Box>
                )}
              </Box>

              {/* Multiple Images Upload */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Ảnh sản phẩm (Images)
                </Typography>
                <Box
                  sx={{
                    border: '2px dashed #ccc',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'primary.main',
                    },
                  }}
                  onClick={() => document.getElementById('images-upload')?.click()}
                >
                  <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Click để chọn nhiều ảnh
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Chọn nhiều ảnh cho sản phẩm
                  </Typography>
                  <input
                    id="images-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImagesChange}
                  />
                </Box>

                {imageForm.watch('images').length > 0 && (
                  <Box mt={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      Ảnh sản phẩm đã chọn ({imageForm.watch('images').length}):
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {Array.from(imageForm.watch('images')).map((file, index) => (
                        <Chip
                          key={index}
                          label={file.name}
                          onDelete={() => {
                            const newFiles = imageForm.watch('images').filter((_, i) => i !== index);
                            imageForm.setValue('images', newFiles);
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImageDialog(false)}>Hủy</Button>
          <Button
            onClick={imageForm.handleSubmit(onSubmitImages)}
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Product Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Chi tiết Sản phẩm</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <img
                  src={selectedProduct.thumbnail || '/placeholder-image.jpg'}
                  alt={selectedProduct.name}
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {selectedProduct.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {selectedProduct.description}
                </Typography>
                <Box mb={2}>
                  <Chip label={selectedProduct.category} color="primary" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  <strong>Danh mục:</strong> {selectedProduct.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Số ảnh:</strong> {Array.isArray(selectedProduct.images) ? selectedProduct.images.length : 0}
                </Typography>

                <Box mt={2}>
                  <Typography variant="h6" gutterBottom>
                    Gói dịch vụ:
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Tên gói</TableCell>
                          <TableCell align="right">Giá</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.isArray(selectedProduct.package) && selectedProduct.package.map((pkg, index) => (
                          <TableRow key={index}>
                            <TableCell>{pkg.package_name}</TableCell>
                            <TableCell align="right">
                              {pkg.price.toLocaleString()}đ
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>

                {Array.isArray(selectedProduct.images) && selectedProduct.images.length > 0 && (
                  <Box mt={2}>
                    <Typography variant="h6" gutterBottom>
                      Ảnh sản phẩm:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {selectedProduct.images.map((imageUrl, index) => (
                        <img
                          key={index}
                          src={imageUrl}
                          alt={`${selectedProduct.name} - ${index + 1}`}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: '4px'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={cancelDeleteProduct} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <DeleteIcon color="error" />
            <Typography variant="h6">Xác nhận xóa sản phẩm</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              Bạn có chắc chắn muốn xóa sản phẩm này?
            </Typography>
            {productToDelete && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {productToDelete.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {productToDelete.description}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={productToDelete.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </Box>
            )}
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              ⚠️ Hành động này không thể hoàn tác!
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button
            onClick={cancelDeleteProduct}
            variant="outlined"
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            onClick={confirmDeleteProduct}
            variant="contained"
            color="error"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : <DeleteIcon />}
          >
            {loading ? 'Đang xóa...' : 'Xóa sản phẩm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductManagement;
