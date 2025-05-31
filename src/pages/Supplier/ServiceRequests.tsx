// import React, { useState } from 'react';
// import {
//     Box,
//     Container,
//     Typography,
//     Card,
//     CardContent,
//     Grid,
//     Button,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Chip,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
// } from '@mui/material';

// interface ServiceRequest {
//     id: number;
//     customerName: string;
//     serviceName: string;
//     date: string;
//     status: 'pending' | 'confirmed' | 'cancelled';
//     type: 'booking' | 'cancellation';
//     reason?: string;
// }

// const ServiceRequests = () => {
//     const [requests, setRequests] = useState<ServiceRequest[]>([
//         {
//             id: 1,
//             customerName: 'John Doe',
//             serviceName: 'Wedding Photography',
//             date: '2024-03-20',
//             status: 'pending',
//             type: 'booking',
//         },
//         {
//             id: 2,
//             customerName: 'Jane Smith',
//             serviceName: 'Event Catering',
//             date: '2024-03-25',
//             status: 'cancelled',
//             type: 'cancellation',
//             reason: 'Change of plans',
//         },
//     ]);

//     const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
//     const [openDialog, setOpenDialog] = useState(false);
//     const [response, setResponse] = useState('');

//     const handleViewDetails = (request: ServiceRequest) => {
//         setSelectedRequest(request);
//         setOpenDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//         setSelectedRequest(null);
//         setResponse('');
//     };

//     const handleConfirmRequest = (id: number) => {
//         setRequests(
//             requests.map((request) =>
//                 request.id === id ? { ...request, status: 'confirmed' } : request
//             )
//         );
//     };

//     const handleRejectRequest = (id: number) => {
//         setRequests(
//             requests.map((request) =>
//                 request.id === id ? { ...request, status: 'cancelled' } : request
//             )
//         );
//     };

//     const handleSubmitResponse = () => {
//         if (selectedRequest && response) {
//             // Handle response submission
//             console.log('Response submitted:', response);
//             handleCloseDialog();
//         }
//     };

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case 'pending':
//                 return 'warning';
//             case 'confirmed':
//                 return 'success';
//             case 'cancelled':
//                 return 'error';
//             default:
//                 return 'default';
//         }
//     };

//     return (
//         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//             <Typography variant="h4" gutterBottom>
//                 Service Requests
//             </Typography>

//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <Card>
//                         <CardContent>
//                             <TableContainer component={Paper}>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell>Customer</TableCell>
//                                             <TableCell>Service</TableCell>
//                                             <TableCell>Date</TableCell>
//                                             <TableCell>Type</TableCell>
//                                             <TableCell>Status</TableCell>
//                                             <TableCell>Actions</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {requests.map((request) => (
//                                             <TableRow key={request.id}>
//                                                 <TableCell>{request.customerName}</TableCell>
//                                                 <TableCell>{request.serviceName}</TableCell>
//                                                 <TableCell>{request.date}</TableCell>
//                                                 <TableCell>
//                                                     <Chip
//                                                         label={request.type}
//                                                         color={request.type === 'booking' ? 'primary' : 'secondary'}
//                                                         size="small"
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Chip
//                                                         label={request.status}
//                                                         color={getStatusColor(request.status)}
//                                                         size="small"
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Button
//                                                         variant="outlined"
//                                                         size="small"
//                                                         onClick={() => handleViewDetails(request)}
//                                                         sx={{ mr: 1 }}
//                                                     >
//                                                         View Details
//                                                     </Button>
//                                                     {request.status === 'pending' && (
//                                                         <>
//                                                             <Button
//                                                                 variant="contained"
//                                                                 color="success"
//                                                                 size="small"
//                                                                 onClick={() => handleConfirmRequest(request.id)}
//                                                                 sx={{ mr: 1 }}
//                                                             >
//                                                                 Confirm
//                                                             </Button>
//                                                             <Button
//                                                                 variant="contained"
//                                                                 color="error"
//                                                                 size="small"
//                                                                 onClick={() => handleRejectRequest(request.id)}
//                                                             >
//                                                                 Reject
//                                                             </Button>
//                                                         </>
//                                                     )}
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>

//             <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//                 <DialogTitle>
//                     {selectedRequest?.type === 'booking'
//                         ? 'Booking Request Details'
//                         : 'Cancellation Request Details'}
//                 </DialogTitle>
//                 <DialogContent>
//                     {selectedRequest && (
//                         <Box sx={{ pt: 2 }}>
//                             <Typography variant="subtitle1" gutterBottom>
//                                 Customer: {selectedRequest.customerName}
//                             </Typography>
//                             <Typography variant="subtitle1" gutterBottom>
//                                 Service: {selectedRequest.serviceName}
//                             </Typography>
//                             <Typography variant="subtitle1" gutterBottom>
//                                 Date: {selectedRequest.date}
//                             </Typography>
//                             {selectedRequest.reason && (
//                                 <Typography variant="subtitle1" gutterBottom>
//                                     Reason: {selectedRequest.reason}
//                                 </Typography>
//                             )}
//                             <TextField
//                                 fullWidth
//                                 multiline
//                                 rows={4}
//                                 label="Your Response"
//                                 value={response}
//                                 onChange={(e) => setResponse(e.target.value)}
//                                 sx={{ mt: 2 }}
//                             />
//                         </Box>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseDialog}>Cancel</Button>
//                     <Button onClick={handleSubmitResponse} variant="contained">
//                         Submit Response
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Container>
//     );
// };

// export default ServiceRequests; 