require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');

mongoose.connect(process.env.MONGO_URI).then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend on ${PORT}`));
console.log("JWT Secret: ", process.env.JWT_SECRET);