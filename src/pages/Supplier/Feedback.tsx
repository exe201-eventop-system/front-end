import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Rating,
    Avatar,
    Divider,
    Tabs,
    Tab,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';

interface Feedback {
    id: number;
    customerName: string;
    serviceName: string;
    rating: number;
    comment: string;
    date: string;
    status: 'pending' | 'responded';
    response?: string;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`feedback-tabpanel-${index}`}
            aria-labelledby={`feedback-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const Feedback = () => {
    const [value, setValue] = useState(0);
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [response, setResponse] = useState('');

    const [feedbacks] = useState<Feedback[]>([
        {
            id: 1,
            customerName: 'John Doe',
            serviceName: 'Wedding Photography',
            rating: 5,
            comment: 'Excellent service! The photographer was professional and captured all the special moments perfectly.',
            date: '2024-03-15',
            status: 'pending',
        },
        {
            id: 2,
            customerName: 'Jane Smith',
            serviceName: 'Event Catering',
            rating: 4,
            comment: 'Good food and service, but there were some delays in delivery.',
            date: '2024-03-10',
            status: 'responded',
            response: 'Thank you for your feedback. We apologize for the delays and are working to improve our delivery times.',
        },
    ]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleViewFeedback = (feedback: Feedback) => {
        setSelectedFeedback(feedback);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedFeedback(null);
        setResponse('');
    };

    const handleSubmitResponse = () => {
        if (selectedFeedback && response) {
            // Handle response submission
            console.log('Response submitted:', response);
            handleCloseDialog();
        }
    };

    const getAverageRating = (feedbacks: Feedback[]) => {
        if (feedbacks.length === 0) return 0;
        const sum = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
        return sum / feedbacks.length;
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Service Feedback
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Overall Rating
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Rating
                                    value={getAverageRating(feedbacks)}
                                    precision={0.5}
                                    readOnly
                                    size="large"
                                />
                                <Typography variant="h4" sx={{ ml: 2 }}>
                                    {getAverageRating(feedbacks).toFixed(1)}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Based on {feedbacks.length} reviews
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange}>
                                    <Tab label="All Feedback" />
                                    <Tab label="Pending Response" />
                                </Tabs>
                            </Box>

                            <TabPanel value={value} index={0}>
                                {feedbacks.map((feedback) => (
                                    <Box key={feedback.id} sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Avatar sx={{ mr: 2 }}>{feedback.customerName[0]}</Avatar>
                                            <Box>
                                                <Typography variant="subtitle1">
                                                    {feedback.customerName}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {feedback.date}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="subtitle2" gutterBottom>
                                            {feedback.serviceName}
                                        </Typography>
                                        <Rating value={feedback.rating} readOnly size="small" />
                                        <Typography variant="body1" sx={{ mt: 1 }}>
                                            {feedback.comment}
                                        </Typography>
                                        {feedback.response && (
                                            <Box sx={{ mt: 2, pl: 2, borderLeft: 2, borderColor: 'primary.main' }}>
                                                <Typography variant="subtitle2" color="primary">
                                                    Your Response:
                                                </Typography>
                                                <Typography variant="body2">{feedback.response}</Typography>
                                            </Box>
                                        )}
                                        {feedback.status === 'pending' && (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleViewFeedback(feedback)}
                                                sx={{ mt: 1 }}
                                            >
                                                Respond
                                            </Button>
                                        )}
                                        <Divider sx={{ mt: 2 }} />
                                    </Box>
                                ))}
                            </TabPanel>

                            <TabPanel value={value} index={1}>
                                {feedbacks
                                    .filter((feedback) => feedback.status === 'pending')
                                    .map((feedback) => (
                                        <Box key={feedback.id} sx={{ mb: 3 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Avatar sx={{ mr: 2 }}>{feedback.customerName[0]}</Avatar>
                                                <Box>
                                                    <Typography variant="subtitle1">
                                                        {feedback.customerName}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {feedback.date}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Typography variant="subtitle2" gutterBottom>
                                                {feedback.serviceName}
                                            </Typography>
                                            <Rating value={feedback.rating} readOnly size="small" />
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                {feedback.comment}
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleViewFeedback(feedback)}
                                                sx={{ mt: 1 }}
                                            >
                                                Respond
                                            </Button>
                                            <Divider sx={{ mt: 2 }} />
                                        </Box>
                                    ))}
                            </TabPanel>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Respond to Feedback</DialogTitle>
                <DialogContent>
                    {selectedFeedback && (
                        <Box sx={{ pt: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Customer: {selectedFeedback.customerName}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Service: {selectedFeedback.serviceName}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Rating: <Rating value={selectedFeedback.rating} readOnly size="small" />
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Comment: {selectedFeedback.comment}
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Your Response"
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                sx={{ mt: 2 }}
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmitResponse} variant="contained">
                        Submit Response
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Feedback; 