require('dotenv').config();
let express = require('express');
let mongoose = require('mongoose');
let path = require('path');

let app = express();
let PORT = 1200;

// Middleware to serve static files like HTML
app.use(express.static(path.join(__dirname, 'public')));

// Route for the register page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html')); // Serve register.html for /
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html')); // Serve register.html for /register
});

// Middleware for handling URL-encoded data
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Atlas Connected");
}).catch((err) => {
    console.error("MongoDB Atlas Connection Error:", err.message);
});

// Schema and Model for registration
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String,
});
const User = mongoose.model('Register', userSchema);

// Handle user registration form submission
app.post('/submit', async (req, res) => {
    const { name, email, pass, Repass } = req.body;

    if (pass !== Repass) {
        return res.send("<h3>Passwords do not match. Please go back and try again.</h3>");
    }

    try {
        const newUser = new User({ name, email, pass });
        await newUser.save();
        res.send('<h2>User saved successfully</h2><a href="/register">Go Back</a>');
    } catch (err) {
        console.error("Error saving user:", err);
        res.status(500).send("Error saving user");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
