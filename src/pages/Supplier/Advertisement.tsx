// import React, { useState, ChangeEvent } from 'react';
// import {
//     Box,
//     Container,
//     Typography,
//     Card,
//     CardContent,
//     Grid,
//     Button,
//     TextField,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Radio,
//     RadioGroup,
//     FormControlLabel,
//     FormLabel,
//     Stepper,
//     Step,
//     StepLabel,
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
//     Chip,
//     SelectChangeEvent,
// } from '@mui/material';

// interface Advertisement {
//     id: number;
//     title: string;
//     type: string;
//     duration: string;
//     status: 'pending' | 'active' | 'expired';
//     startDate?: string;
//     endDate?: string;
//     paymentStatus: 'pending' | 'completed';
// }

// const Advertisement = () => {
//     const [activeStep, setActiveStep] = useState(0);
//     const [openDialog, setOpenDialog] = useState(false);
//     const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);

//     const [advertisements] = useState<Advertisement[]>([
//         {
//             id: 1,
//             title: 'Wedding Photography Promotion',
//             type: 'Banner',
//             duration: '1 month',
//             status: 'active',
//             startDate: '2024-03-01',
//             endDate: '2024-04-01',
//             paymentStatus: 'completed',
//         },
//         {
//             id: 2,
//             title: 'Event Planning Services',
//             type: 'Featured Listing',
//             duration: '2 weeks',
//             status: 'pending',
//             paymentStatus: 'pending',
//         },
//     ]);

//     const [formData, setFormData] = useState({
//         title: '',
//         type: '',
//         duration: '',
//         description: '',
//         paymentMethod: 'credit_card',
//     });

//     const steps = ['Advertisement Details', 'Payment Information', 'Confirmation'];

//     const handleNext = () => {
//         setActiveStep((prevStep) => prevStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevStep) => prevStep - 1);
//     };

//     const handleSubmit = () => {
//         // Handle form submission
//         console.log('Form submitted:', formData);
//         setOpenDialog(false);
//         setActiveStep(0);
//         setFormData({
//             title: '',
//             type: '',
//             duration: '',
//             description: '',
//             paymentMethod: 'credit_card',
//         });
//     };

//     const handleViewDetails = (ad: Advertisement) => {
//         setSelectedAd(ad);
//         setOpenDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//         setSelectedAd(null);
//     };

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case 'active':
//                 return 'success';
//             case 'pending':
//                 return 'warning';
//             case 'expired':
//                 return 'error';
//             default:
//                 return 'default';
//         }
//     };

//     const renderStepContent = (step: number) => {
//         switch (step) {
//             case 0:
//                 return (
//                     <Grid container spacing={3}>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Advertisement Title"
//                                 value={formData.title}
//                                 onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                                     setFormData({ ...formData, title: e.target.value })
//                                 }
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <FormControl fullWidth>
//                                 <InputLabel>Advertisement Type</InputLabel>
//                                 <Select
//                                     value={formData.type}
//                                     label="Advertisement Type"
//                                     onChange={(e: SelectChangeEvent) =>
//                                         setFormData({ ...formData, type: e.target.value })
//                                     }
//                                 >
//                                     <MenuItem value="banner">Banner</MenuItem>
//                                     <MenuItem value="featured">Featured Listing</MenuItem>
//                                     <MenuItem value="popup">Popup</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <FormControl fullWidth>
//                                 <InputLabel>Duration</InputLabel>
//                                 <Select
//                                     value={formData.duration}
//                                     label="Duration"
//                                     onChange={(e: SelectChangeEvent) =>
//                                         setFormData({ ...formData, duration: e.target.value })
//                                     }
//                                 >
//                                     <MenuItem value="1_week">1 Week</MenuItem>
//                                     <MenuItem value="2_weeks">2 Weeks</MenuItem>
//                                     <MenuItem value="1_month">1 Month</MenuItem>
//                                     <MenuItem value="3_months">3 Months</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 multiline
//                                 rows={4}
//                                 label="Description"
//                                 value={formData.description}
//                                 onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
//                                     setFormData({ ...formData, description: e.target.value })
//                                 }
//                             />
//                         </Grid>
//                     </Grid>
//                 );
//             case 1:
//                 return (
//                     <Grid container spacing={3}>
//                         <Grid item xs={12}>
//                             <FormControl component="fieldset">
//                                 <FormLabel component="legend">Payment Method</FormLabel>
//                                 <RadioGroup
//                                     value={formData.paymentMethod}
//                                     onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                                         setFormData({ ...formData, paymentMethod: e.target.value })
//                                     }
//                                 >
//                                     <FormControlLabel
//                                         value="credit_card"
//                                         control={<Radio />}
//                                         label="Credit Card"
//                                     />
//                                     <FormControlLabel
//                                         value="paypal"
//                                         control={<Radio />}
//                                         label="PayPal"
//                                     />
//                                     <FormControlLabel
//                                         value="bank_transfer"
//                                         control={<Radio />}
//                                         label="Bank Transfer"
//                                     />
//                                 </RadioGroup>
//                             </FormControl>
//                         </Grid>
//                         {formData.paymentMethod === 'credit_card' && (
//                             <>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         fullWidth
//                                         label="Card Number"
//                                         placeholder="1234 5678 9012 3456"
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sm={6}>
//                                     <TextField
//                                         fullWidth
//                                         label="Expiry Date"
//                                         placeholder="MM/YY"
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sm={6}>
//                                     <TextField
//                                         fullWidth
//                                         label="CVV"
//                                         placeholder="123"
//                                     />
//                                 </Grid>
//                             </>
//                         )}
//                     </Grid>
//                 );
//             case 2:
//                 return (
//                     <Box>
//                         <Typography variant="h6" gutterBottom>
//                             Advertisement Summary
//                         </Typography>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12}>
//                                 <Typography variant="subtitle1">
//                                     Title: {formData.title}
//                                 </Typography>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <Typography variant="subtitle1">
//                                     Type: {formData.type}
//                                 </Typography>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <Typography variant="subtitle1">
//                                     Duration: {formData.duration}
//                                 </Typography>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <Typography variant="subtitle1">
//                                     Payment Method: {formData.paymentMethod}
//                                 </Typography>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//             <Typography variant="h4" gutterBottom>
//                 Advertisement Management
//             </Typography>

//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <Card>
//                         <CardContent>
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
//                                 <Typography variant="h6">Your Advertisements</Typography>
//                                 <Button
//                                     variant="contained"
//                                     onClick={() => setOpenDialog(true)}
//                                 >
//                                     Create New Advertisement
//                                 </Button>
//                             </Box>

//                             <TableContainer component={Paper}>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell>Title</TableCell>
//                                             <TableCell>Type</TableCell>
//                                             <TableCell>Duration</TableCell>
//                                             <TableCell>Status</TableCell>
//                                             <TableCell>Payment Status</TableCell>
//                                             <TableCell>Actions</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {advertisements.map((ad) => (
//                                             <TableRow key={ad.id}>
//                                                 <TableCell>{ad.title}</TableCell>
//                                                 <TableCell>{ad.type}</TableCell>
//                                                 <TableCell>{ad.duration}</TableCell>
//                                                 <TableCell>
//                                                     <Chip
//                                                         label={ad.status}
//                                                         color={getStatusColor(ad.status)}
//                                                         size="small"
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Chip
//                                                         label={ad.paymentStatus}
//                                                         color={ad.paymentStatus === 'completed' ? 'success' : 'warning'}
//                                                         size="small"
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Button
//                                                         variant="outlined"
//                                                         size="small"
//                                                         onClick={() => handleViewDetails(ad)}
//                                                     >
//                                                         View Details
//                                                     </Button>
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

//             <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//                 <DialogTitle>Create New Advertisement</DialogTitle>
//                 <DialogContent>
//                     <Box sx={{ mt: 2 }}>
//                         <Stepper activeStep={activeStep} alternativeLabel>
//                             {steps.map((label) => (
//                                 <Step key={label}>
//                                     <StepLabel>{label}</StepLabel>
//                                 </Step>
//                             ))}
//                         </Stepper>
//                         <Box sx={{ mt: 4 }}>{renderStepContent(activeStep)}</Box>
//                     </Box>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseDialog}>Cancel</Button>
//                     {activeStep > 0 && (
//                         <Button onClick={handleBack}>Back</Button>
//                     )}
//                     {activeStep === steps.length - 1 ? (
//                         <Button onClick={handleSubmit} variant="contained">
//                             Submit
//                         </Button>
//                     ) : (
//                         <Button onClick={handleNext} variant="contained">
//                             Next
//                         </Button>
//                     )}
//                 </DialogActions>
//             </Dialog>
//         </Container>
//     );
// };

// export default Advertisement; 