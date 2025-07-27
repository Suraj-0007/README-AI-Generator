const express = require('express');
const cors = require('cors');
const app = express();

// ✅ Allow all origins (not strict, but useful for dev/demo)
app.use(cors({
  origin: true, // Accept requests from any origin
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
