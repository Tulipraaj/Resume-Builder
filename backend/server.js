const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config()
const resumeRoutes = require("./routes/resume")
const userRoutes = require("./routes/user")


const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/resumes', resumeRoutes);
app.use('/api/users', userRoutes);


mongoose.connect("mongodb://localhost:27017/resume_builder")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err));



app.get('/', (req, res)=> {
    res.send('Server is running')
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
