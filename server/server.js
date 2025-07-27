const express = require('express');
const cors = require('cors');
const app = express();

// ✅ Allow both local and deployed frontend
const allowedOrigins = ['http://localhost:3000', 'https://your-frontend.vercel.app']; // Replace with actual Vercel URL

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like curl, mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// ✅ Import your routes
const generateRoute = require('./routes/generate');
app.use('/api/generate', generateRoute);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
