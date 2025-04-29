// // Express
// require('dotenv').config();
//  let express=require('express')
//  let mongoose=require('mongoose')
//  let path = require('path')


//  let app=express();
//  let PORT=1200;



// // express.static for open web on local server

// app.use(express.static(path.join(__dirname,'public')));
// app.get('/' ,function(req,res){
//     res.sendFile(path.join(__dirname, 'public','login.html'));
//     res.end("<h1>blank</h1>")
// });
// app.get('/login' ,function(req,res){
//     res.sendFile(path.join(__dirname, 'public','login.html'));
    
// });
// app.get('/register' ,function(req,res){
//     res.sendFile(path.join(__dirname, 'public','register.html'));
    
// });

// // user express built in URL encoded parser
// app.use(express.urlencoded({extended:true}));

// // MongoDB Atlas connection (ONLY THIS)
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log(" MongoDB Atlas Connected");
// }).catch((err) => {
//     console.error("MongoDB Atlas Connection Error:", err.message);
// });


// // MOngoDB connection
// mongoose.connect('mongodb://localhost:27017/RegisterFormDB',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// } )

// // then() call when connection is succesfully 
// .then(() => {
//     console.log("MongoDB Connected");
// })
// .catch((err)=>{
//     console.error("Error saving user:",err);
//   });

//   // Schema and Model
//    const userSchema= new mongoose.Schema({
//       name: String,
//       email: String,
//       pass:String,
      
  
//   });
//   const user = mongoose.model('Register' ,userSchema);

//   // post use handel for submission
//     app.post('/submit' , async(req ,res) =>{
//     const{name ,email,pass,Repass} = req.body;

//     if (pass !== Repass) {
//         return res.send("<h3>Passwords do not match. Please go back and try again.</h3>");
//     }

//     try{
//         const newUser = new user ({name ,email,pass});
//         await newUser .save();
//         res.send('<h2> user saved successfully</h2><a href="/">GO Back</a>');
//     }
//     catch (err){
//         console.error(err);
//         res.status(1200).send("error saving user");
//     }
// });


// //  start the server
// app.listen(PORT ,()=>{
//     console.log('server running ')
// })



require('dotenv').config();
let express = require('express');
let mongoose = require('mongoose');
let path = require('path');

let app = express();
let PORT = 1200;

// Middleware to serve static files like HTML
app.use(express.static(path.join(__dirname, 'public')));

// Routes for login and register pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
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


