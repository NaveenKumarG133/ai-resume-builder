const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5050; // Changed to 5050 to avoid conflicts

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB Connection (Non-blocking)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resumebuilder');
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error (Server will still work for AI):', err.message);
    }
};
connectDB();

// Health Check
app.get('/health', (req, res) => {
    res.json({
        status: 'Server is Live!',
        aiKeyPresent: !!process.env.GEMINI_API_KEY,
        time: new Date().toLocaleTimeString()
    });
});


// Resume Routes (Placeholder)
app.use('/api/resumes', require('./routes/resumeRoutes'));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server ready at http://127.0.0.1:${PORT}`);
    console.log(`🔗 Test AI here: http://127.0.0.1:${PORT}/health`);
});
