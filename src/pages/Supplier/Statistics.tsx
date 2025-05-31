// import React, { useState } from 'react';
// import {
//     Box,
//     Container,
//     Typography,
//     Tabs,
//     Tab,
//     Card,
//     CardContent,
//     Grid,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Button,
// } from '@mui/material';
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from 'recharts';

// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: number;
//     value: number;
// }

// function TabPanel(props: TabPanelProps) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`statistics-tabpanel-${index}`}
//             aria-labelledby={`statistics-tab-${index}`}
//             {...other}
//         >
//             {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//         </div>
//     );
// }

// const Statistics = () => {
//     const [timeValue, setTimeValue] = useState(0);
//     const [statValue, setStatValue] = useState(0);

//     const handleTimeChange = (event: React.SyntheticEvent, newValue: number) => {
//         setTimeValue(newValue);
//     };

//     const handleStatChange = (event: React.SyntheticEvent, newValue: number) => {
//         setStatValue(newValue);
//     };

//     // Mock data - replace with actual API calls
//     const serviceData = [
//         { name: 'Service 1', users: 400 },
//         { name: 'Service 2', users: 300 },
//         { name: 'Service 3', users: 200 },
//         { name: 'Service 4', users: 150 },
//         { name: 'Service 5', users: 100 },
//     ];

//     const topServices = [
//         { name: 'Service A', rating: 4.8, reviews: 120 },
//         { name: 'Service B', rating: 4.7, reviews: 100 },
//         { name: 'Service C', rating: 4.6, reviews: 90 },
//     ];

//     const cancelledServices = [
//         { id: 1, service: 'Service X', reason: 'Customer request', date: '2024-03-15' },
//         { id: 2, service: 'Service Y', reason: 'Technical issues', date: '2024-03-14' },
//         { id: 3, service: 'Service Z', reason: 'Weather conditions', date: '2024-03-13' },
//     ];

//     return (
//         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//             <Typography variant="h4" gutterBottom>
//                 Service Statistics
//             </Typography>

//             <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
//                 <Tabs value={timeValue} onChange={handleTimeChange}>
//                     <Tab label="Weekly" />
//                     <Tab label="Monthly" />
//                     <Tab label="Quarterly" />
//                     <Tab label="Yearly" />
//                 </Tabs>
//             </Box>

//             <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
//                 <Tabs value={statValue} onChange={handleStatChange}>
//                     <Tab label="Service Usage" />
//                     <Tab label="Top Services" />
//                     <Tab label="Cancellations" />
//                 </Tabs>
//             </Box>

//             <TabPanel value={statValue} index={0}>
//                 <Card>
//                     <CardContent>
//                         <Typography variant="h6" gutterBottom>
//                             Service Usage Statistics
//                         </Typography>
//                         <Box sx={{ height: 400 }}>
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <BarChart data={serviceData}>
//                                     <CartesianGrid strokeDasharray="3 3" />
//                                     <XAxis dataKey="name" />
//                                     <YAxis />
//                                     <Tooltip />
//                                     <Legend />
//                                     <Bar dataKey="users" fill="#8884d8" />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </Box>
//                     </CardContent>
//                 </Card>
//             </TabPanel>

//             <TabPanel value={statValue} index={1}>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12}>
//                         <Card>
//                             <CardContent>
//                                 <Typography variant="h6" gutterBottom>
//                                     Top 10 Most Popular Services
//                                 </Typography>
//                                 <TableContainer component={Paper}>
//                                     <Table>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell>Service Name</TableCell>
//                                                 <TableCell align="right">Rating</TableCell>
//                                                 <TableCell align="right">Number of Reviews</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {topServices.map((service) => (
//                                                 <TableRow key={service.name}>
//                                                     <TableCell>{service.name}</TableCell>
//                                                     <TableCell align="right">{service.rating}</TableCell>
//                                                     <TableCell align="right">{service.reviews}</TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 </Grid>
//             </TabPanel>

//             <TabPanel value={statValue} index={2}>
//                 <Card>
//                     <CardContent>
//                         <Typography variant="h6" gutterBottom>
//                             Service Cancellations
//                         </Typography>
//                         <TableContainer component={Paper}>
//                             <Table>
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Service</TableCell>
//                                         <TableCell>Reason</TableCell>
//                                         <TableCell>Date</TableCell>
//                                         <TableCell>Action</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {cancelledServices.map((service) => (
//                                         <TableRow key={service.id}>
//                                             <TableCell>{service.service}</TableCell>
//                                             <TableCell>{service.reason}</TableCell>
//                                             <TableCell>{service.date}</TableCell>
//                                             <TableCell>
//                                                 <Button
//                                                     variant="outlined"
//                                                     size="small"
//                                                     onClick={() => {
//                                                         // Handle view details
//                                                     }}
//                                                 >
//                                                     View Details
//                                                 </Button>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     </CardContent>
//                 </Card>
//             </TabPanel>
//         </Container>
//     );
// };

// export default Statistics; 