// import React, { useState } from 'react';
// import {
//     Box,
//     Container,
//     Typography,
//     Card,
//     CardContent,
//     Grid,
//     Button,
//     TextField,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     IconButton,
//     Chip,
// } from '@mui/material';
// import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

// interface Service {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     status: 'active' | 'inactive';
//     category: string;
// }

// const ServiceManagement = () => {
//     const [open, setOpen] = useState(false);
//     const [editingService, setEditingService] = useState<Service | null>(null);
//     const [services, setServices] = useState<Service[]>([
//         {
//             id: 1,
//             name: 'Wedding Photography',
//             description: 'Professional wedding photography service',
//             price: 1000,
//             status: 'active',
//             category: 'Photography',
//         },
//         // Add more mock services as needed
//     ]);

//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         price: '',
//         category: '',
//     });

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setEditingService(null);
//         setFormData({
//             name: '',
//             description: '',
//             price: '',
//             category: '',
//         });
//     };

//     const handleEdit = (service: Service) => {
//         setEditingService(service);
//         setFormData({
//             name: service.name,
//             description: service.description,
//             price: service.price.toString(),
//             category: service.category,
//         });
//         setOpen(true);
//     };

//     const handleDelete = (id: number) => {
//         setServices(services.filter((service) => service.id !== id));
//     };

//     const handleSubmit = () => {
//         if (editingService) {
//             // Update existing service
//             setServices(
//                 services.map((service) =>
//                     service.id === editingService.id
//                         ? {
//                             ...service,
//                             name: formData.name,
//                             description: formData.description,
//                             price: Number(formData.price),
//                             category: formData.category,
//                         }
//                         : service
//                 )
//             );
//         } else {
//             // Add new service
//             const newService: Service = {
//                 id: services.length + 1,
//                 name: formData.name,
//                 description: formData.description,
//                 price: Number(formData.price),
//                 status: 'active',
//                 category: formData.category,
//             };
//             setServices([...services, newService]);
//         }
//         handleClose();
//     };

//     return (
//         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
//                 <Typography variant="h4">Service Management</Typography>
//                 <Button
//                     variant="contained"
//                     startIcon={<AddIcon />}
//                     onClick={handleClickOpen}
//                 >
//                     Add New Service
//                 </Button>
//             </Box>

//             <Card>
//                 <CardContent>
//                     <TableContainer component={Paper}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Service Name</TableCell>
//                                     <TableCell>Description</TableCell>
//                                     <TableCell>Price</TableCell>
//                                     <TableCell>Category</TableCell>
//                                     <TableCell>Status</TableCell>
//                                     <TableCell>Actions</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {services.map((service) => (
//                                     <TableRow key={service.id}>
//                                         <TableCell>{service.name}</TableCell>
//                                         <TableCell>{service.description}</TableCell>
//                                         <TableCell>${service.price}</TableCell>
//                                         <TableCell>{service.category}</TableCell>
//                                         <TableCell>
//                                             <Chip
//                                                 label={service.status}
//                                                 color={service.status === 'active' ? 'success' : 'default'}
//                                                 size="small"
//                                             />
//                                         </TableCell>
//                                         <TableCell>
//                                             <IconButton
//                                                 color="primary"
//                                                 onClick={() => handleEdit(service)}
//                                             >
//                                                 <EditIcon />
//                                             </IconButton>
//                                             <IconButton
//                                                 color="error"
//                                                 onClick={() => handleDelete(service.id)}
//                                             >
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </CardContent>
//             </Card>

//             <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//                 <DialogTitle>
//                     {editingService ? 'Edit Service' : 'Add New Service'}
//                 </DialogTitle>
//                 <DialogContent>
//                     <Box sx={{ pt: 2 }}>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     fullWidth
//                                     label="Service Name"
//                                     value={formData.name}
//                                     onChange={(e) =>
//                                         setFormData({ ...formData, name: e.target.value })
//                                     }
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     fullWidth
//                                     multiline
//                                     rows={4}
//                                     label="Description"
//                                     value={formData.description}
//                                     onChange={(e) =>
//                                         setFormData({ ...formData, description: e.target.value })
//                                     }
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     fullWidth
//                                     label="Price"
//                                     type="number"
//                                     value={formData.price}
//                                     onChange={(e) =>
//                                         setFormData({ ...formData, price: e.target.value })
//                                     }
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     fullWidth
//                                     label="Category"
//                                     value={formData.category}
//                                     onChange={(e) =>
//                                         setFormData({ ...formData, category: e.target.value })
//                                     }
//                                 />
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button onClick={handleSubmit} variant="contained">
//                         {editingService ? 'Update' : 'Add'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Container>
//     );
// };

// export default ServiceManagement; 