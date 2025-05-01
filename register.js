require('dotenv').config(); // Load env first
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 1200;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Atlas Connected");
}).catch((err) => {
    console.error("MongoDB Atlas Connection Error:", err.message);
});

// Mongoose schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String,
});
const User = mongoose.model('Register', userSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/submit', async (req, res) => {
    const { name, email, pass, Repass } = req.body;

    if (pass !== Repass) {
        return res.send("<h3>Passwords do not match. Please go back and try again.</h3>");
    }

    try {
        const newUser = new User({ name, email, pass });
        await newUser.save();
        res.send('<h2>User registered successfully</h2><a href="/">Go Back</a>');
    } catch (err) {
        console.error("Error saving user:", err);
        res.status(500).send("Error saving user");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
