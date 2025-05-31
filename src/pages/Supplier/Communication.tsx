// import React, { useState } from 'react';
// import {
//     Box,
//     Container,
//     Typography,
//     Card,
//     CardContent,
//     Grid,
//     List,
//     ListItem,
//     ListItemText,
//     ListItemAvatar,
//     Avatar,
//     Divider,
//     TextField,
//     Button,
//     Tabs,
//     Tab,
//     Badge,
//     IconButton,
// } from '@mui/material';
// import {
//     Send as SendIcon,
//     AttachFile as AttachFileIcon,
// } from '@mui/icons-material';

// interface Message {
//     id: number;
//     sender: string;
//     receiver: string;
//     content: string;
//     timestamp: string;
//     isRead: boolean;
//     attachments?: string[];
// }

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
//             id={`communication-tabpanel-${index}`}
//             aria-labelledby={`communication-tab-${index}`}
//             {...other}
//         >
//             {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//         </div>
//     );
// }

// const Communication = () => {
//     const [value, setValue] = useState(0);
//     const [selectedChat, setSelectedChat] = useState<string | null>(null);
//     const [message, setMessage] = useState('');

//     const [messages] = useState<Message[]>([
//         {
//             id: 1,
//             sender: 'Admin',
//             receiver: 'Supplier',
//             content: 'Hello, we need to discuss the upcoming event services.',
//             timestamp: '2024-03-15 10:30',
//             isRead: true,
//         },
//         {
//             id: 2,
//             sender: 'Supplier',
//             receiver: 'Admin',
//             content: 'Sure, I am available for discussion.',
//             timestamp: '2024-03-15 10:35',
//             isRead: true,
//         },
//         {
//             id: 3,
//             sender: 'John Doe',
//             receiver: 'Supplier',
//             content: 'I would like to know more about your photography services.',
//             timestamp: '2024-03-15 11:00',
//             isRead: false,
//         },
//     ]);

//     const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//         setValue(newValue);
//     };

//     const handleChatSelect = (chat: string) => {
//         setSelectedChat(chat);
//     };

//     const handleSendMessage = () => {
//         if (message.trim() && selectedChat) {
//             // Handle sending message
//             console.log('Sending message:', message);
//             setMessage('');
//         }
//     };

//     const getUnreadCount = (sender: string) => {
//         return messages.filter(
//             (msg) => msg.sender === sender && !msg.isRead
//         ).length;
//     };

//     return (
//         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//             <Typography variant="h4" gutterBottom>
//                 Communication
//             </Typography>

//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={4}>
//                     <Card>
//                         <CardContent>
//                             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                                 <Tabs value={value} onChange={handleChange}>
//                                     <Tab label="Admin" />
//                                     <Tab label="Customers" />
//                                 </Tabs>
//                             </Box>

//                             <TabPanel value={value} index={0}>
//                                 <List>
//                                     <ListItem
//                                         button
//                                         selected={selectedChat === 'Admin'}
//                                         onClick={() => handleChatSelect('Admin')}
//                                     >
//                                         <ListItemAvatar>
//                                             <Badge
//                                                 badgeContent={getUnreadCount('Admin')}
//                                                 color="error"
//                                             >
//                                                 <Avatar>A</Avatar>
//                                             </Badge>
//                                         </ListItemAvatar>
//                                         <ListItemText
//                                             primary="Admin"
//                                             secondary="Last message: 10:35 AM"
//                                         />
//                                     </ListItem>
//                                 </List>
//                             </TabPanel>

//                             <TabPanel value={value} index={1}>
//                                 <List>
//                                     {messages
//                                         .filter((msg) => msg.sender !== 'Admin' && msg.sender !== 'Supplier')
//                                         .map((msg) => (
//                                             <ListItem
//                                                 key={msg.id}
//                                                 button
//                                                 selected={selectedChat === msg.sender}
//                                                 onClick={() => handleChatSelect(msg.sender)}
//                                             >
//                                                 <ListItemAvatar>
//                                                     <Badge
//                                                         badgeContent={getUnreadCount(msg.sender)}
//                                                         color="error"
//                                                     >
//                                                         <Avatar>{msg.sender[0]}</Avatar>
//                                                     </Badge>
//                                                 </ListItemAvatar>
//                                                 <ListItemText
//                                                     primary={msg.sender}
//                                                     secondary={`Last message: ${msg.timestamp}`}
//                                                 />
//                                             </ListItem>
//                                         ))}
//                                 </List>
//                             </TabPanel>
//                         </CardContent>
//                     </Card>
//                 </Grid>

//                 <Grid item xs={12} md={8}>
//                     <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                         <CardContent sx={{ flexGrow: 1, overflow: 'auto' }}>
//                             {selectedChat ? (
//                                 <>
//                                     <Box sx={{ mb: 2 }}>
//                                         <Typography variant="h6">{selectedChat}</Typography>
//                                     </Box>
//                                     <Divider />
//                                     <Box sx={{ mt: 2 }}>
//                                         {messages
//                                             .filter(
//                                                 (msg) =>
//                                                     msg.sender === selectedChat ||
//                                                     msg.receiver === selectedChat
//                                             )
//                                             .map((msg) => (
//                                                 <Box
//                                                     key={msg.id}
//                                                     sx={{
//                                                         display: 'flex',
//                                                         justifyContent:
//                                                             msg.sender === 'Supplier'
//                                                                 ? 'flex-end'
//                                                                 : 'flex-start',
//                                                         mb: 2,
//                                                     }}
//                                                 >
//                                                     <Box
//                                                         sx={{
//                                                             maxWidth: '70%',
//                                                             backgroundColor:
//                                                                 msg.sender === 'Supplier'
//                                                                     ? 'primary.main'
//                                                                     : 'grey.200',
//                                                             color:
//                                                                 msg.sender === 'Supplier'
//                                                                     ? 'white'
//                                                                     : 'text.primary',
//                                                             p: 2,
//                                                             borderRadius: 2,
//                                                         }}
//                                                     >
//                                                         <Typography variant="body1">
//                                                             {msg.content}
//                                                         </Typography>
//                                                         <Typography
//                                                             variant="caption"
//                                                             sx={{
//                                                                 display: 'block',
//                                                                 mt: 1,
//                                                                 color:
//                                                                     msg.sender === 'Supplier'
//                                                                         ? 'rgba(255, 255, 255, 0.7)'
//                                                                         : 'text.secondary',
//                                                             }}
//                                                         >
//                                                             {msg.timestamp}
//                                                         </Typography>
//                                                     </Box>
//                                                 </Box>
//                                             ))}
//                                     </Box>
//                                 </>
//                             ) : (
//                                 <Box
//                                     sx={{
//                                         display: 'flex',
//                                         justifyContent: 'center',
//                                         alignItems: 'center',
//                                         height: '100%',
//                                     }}
//                                 >
//                                     <Typography variant="body1" color="text.secondary">
//                                         Select a chat to start messaging
//                                     </Typography>
//                                 </Box>
//                             )}
//                         </CardContent>
//                         {selectedChat && (
//                             <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
//                                 <Grid container spacing={2}>
//                                     <Grid item xs>
//                                         <TextField
//                                             fullWidth
//                                             placeholder="Type a message..."
//                                             value={message}
//                                             onChange={(e) => setMessage(e.target.value)}
//                                             multiline
//                                             maxRows={4}
//                                         />
//                                     </Grid>
//                                     <Grid item>
//                                         <IconButton>
//                                             <AttachFileIcon />
//                                         </IconButton>
//                                         <Button
//                                             variant="contained"
//                                             endIcon={<SendIcon />}
//                                             onClick={handleSendMessage}
//                                             disabled={!message.trim()}
//                                         >
//                                             Send
//                                         </Button>
//                                     </Grid>
//                                 </Grid>
//                             </Box>
//                         )}
//                     </Card>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default Communication; 