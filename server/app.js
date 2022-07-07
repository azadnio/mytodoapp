
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const port = 8080;

const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const authRoutes2 = require('./routes/auth2');

let NODE_ENV = process.env.NODE_ENV || 'prod'

app.use(bodyParser.json());

//run built application
if (NODE_ENV === 'prod')
    app.use(express.static(path.join(__dirname, './ui/built')));

//authentication routes
app.use('/api/auth', authRoutes);

//authentication by QR code
app.use('/api/auth2', authRoutes2);

//task routes
app.use('/api/task', taskRoutes);


//run the built UI files
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './ui/built/index.html'));
});
  
app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});