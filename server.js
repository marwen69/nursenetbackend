const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session'); // Add this line to import express-session

const nurseRoutes = require('./routes/nurseRoutes.js');
const roomRoutes = require('./routes/roomRoutes.js');
const SurgicalOperationRoutes = require('./routes/SurgicalOperationRoutes.js');
const medicalAdministrationRoutes = require('./routes/medicalAdministrationRoutes.js');


const databaseName = 'hospital';

mongoose.set('debug', true);
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;

mongoose
mongoose.connect(`mongodb+srv://maroueneh5:marouene@cluster0.havv1vm.mongodb.net/${databaseName}?retryWrites=true&w=majority`)
    .then(() => {
        console.log(`Connected to ${databaseName}`);
    })
    .catch(err => {
        console.log(err);
    });

app.use(
    session({
        secret: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMzQzNDgyMiwiaWF0IjoxNzAzNDM0ODIyfQ.uZWn2bQfPUAH2zdzsGX5vWkMwogyeXtJ33nvYPuqdfk', 
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set secure to true if using HTTPS
    })
);

app.use(express.json());
app.use(cors());

// Import the nurse routes
app.use('/api', nurseRoutes);

app.use('/api', roomRoutes);

app.use('/api', SurgicalOperationRoutes);
app.use('/api', medicalAdministrationRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
