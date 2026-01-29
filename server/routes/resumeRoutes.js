const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();
const Resume = require('../models/Resume');
// Basic check - don't log the full key for security
if (!process.env.GEMINI_API_KEY) {
    console.error('CRITICAL: GEMINI_API_KEY is missing from process.env');
} else {
    console.log('GEMINI_API_KEY is present (starts with:', process.env.GEMINI_API_KEY.substring(0, 7) + '...)');
}


// Get all resumes for a user
router.get('/', async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.query.userId || 'demo-user' });
        res.json(resumes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new resume
router.post('/', async (req, res) => {
    const resume = new Resume({
        ...req.body,
        userId: req.body.userId || 'demo-user'
    });
    try {
        const newResume = await resume.save();
        res.status(201).json(newResume);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// AI Rewrite endpoint
router.post('/ai/rewrite', async (req, res) => {
    const { content, field } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(400).json({ message: "Gemini API key not configured" });
    }

    try {
        console.log('Attempting AI rewrite for field:', field);
        const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : "";
        const genAI = new GoogleGenerativeAI(apiKey);

        // List of models to try in order of preference
        const modelsToTry = ["gemini-1.5-flash-latest", "gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
        let lastError = null;
        let text = "";

        for (const modelName of modelsToTry) {
            try {
                console.log(`Trying model: ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const prompt = `As a professional resume writer, rewrite the following ${field} to be more impactful, professional, and ATS-friendly: "${content}"`;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                text = response.text();

                if (text) {
                    console.log(`Successfully used model: ${modelName}`);
                    break;
                }
            } catch (err) {
                console.log(`Model ${modelName} failed/not found.`);
                lastError = err;
            }
        }

        if (!text && lastError) throw lastError;

        res.json({ improvedContent: text });
    } catch (err) {
        console.error('Final AI Error:', err.message);
        let errorMessage = `AI Error: ${err.message}`;

        if (err.message.includes('API_KEY_INVALID')) errorMessage = "Invalid API Key.";
        if (err.message.includes('location')) errorMessage = "Location not supported (Check VPN).";
        if (err.message.includes('404')) errorMessage = "Models not found. Ensure Generative Language API is enabled in AI Studio.";

        res.status(500).json({ message: errorMessage, error: err.message });
    }
});

// Helper to see available models
router.get('/list-models', async (req, res) => {
    res.json({
        info: "To see all models, you would normally call genAI.listModels(), but that requires specific permissions. Please try the /test-ai link instead."
    });
});


// Test AI connection
router.get('/test-ai', async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return res.status(400).json({ status: 'error', message: 'API Key missing in .env' });
        }
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.trim());
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        res.json({
            status: 'success',
            message: 'AI is connected!',
            aiResponse: response.text(),
            keyUsed: process.env.GEMINI_API_KEY.substring(0, 7) + '...'
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
            stack: err.stack
        });
    }
});

module.exports = router;
