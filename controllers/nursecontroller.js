// controllers/nurseController.js
const Nurse = require('../models/nurse');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'; // Replace with your generated secret key


// Controller for handling nurse-related operations

// Get all nurses
const getAllNurses = async (req, res) => {
    try {
        const nurses = await Nurse.find();
        res.json(nurses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





// Get a specific nurse by ID
const getNurseById = async (req, res) => {
    try {
        const nurse = await Nurse.findById(req.params.id);
        if (nurse) {
            res.json(nurse);
        } else {
            res.status(404).json({ message: 'Nurse not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginNurse = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const nurse = await Nurse.findOne({ email });
  
        if (!nurse) {
            return res.status(404).json({ message: 'Nurse not found' });
        }
  
        const isPasswordValid = await bcrypt.compare(password, nurse.password);
  
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
  
        req.session.user = {
            firstName: nurse.firstName,
            lastName: nurse.lastName,
        };
  
        res.status(200).json({
            message: 'Login successful',
            nurse: { // Include nurse's information in the response
                firstName: nurse.firstName,
                lastName: nurse.lastName,
                age: nurse.age,
                email: nurse.email,
                experience: nurse.experience,
                profileImage: nurse.profileImage,
                status: nurse.status,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createNurse = async (req, res) => {
    const nurseData = req.body;

    try {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(nurseData.password, 10); // 10 is the saltRounds

        // Create a new nurse with the hashed password
        const newNurse = await Nurse.create({
            ...nurseData,
            password: hashedPassword
        });

        // Send welcome email
        const msg = {
            to: newNurse.email,
            from: 'noreply@nursenet.tech', 
            subject: 'Bienvenue sur NurseNet!', 
            text: `Cher ${newNurse.firstName},\n\nBienvenue sur NurseNet ! Votre compte a été créé avec succès.\n\nEmail: ${newNurse.email}\nMot de passe: ${nurseData.password}\n\nMerci de nous rejoindre !`,
            
        };

        await sgMail.send(msg);

        res.status(201).json(newNurse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const updateNurse = async (req, res) => {
    try {
        const nurse = await Nurse.findById(req.params.id);
        if (nurse) {
            // Check if a new password is provided and hash it
            if (req.body.password) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                nurse.password = hashedPassword;
            }

            nurse.firstName = req.body.firstName || nurse.firstName;
            nurse.lastName = req.body.lastName || nurse.lastName;
            nurse.age = req.body.age || nurse.age;
            nurse.email = req.body.email || nurse.email;
            // Remove the line nurse.password = req.body.password || nurse.password;

            nurse.experience = req.body.experience || nurse.experience;
            nurse.profileImage = req.body.profileImage || nurse.profileImage;
            nurse.status = req.body.status || nurse.status;

            const updatedNurse = await nurse.save();
            res.json(updatedNurse);
        } else {
            res.status(404).json({ message: 'Nurse not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a nurse by ID
const deleteNurse = async (req, res) => {
    try {
        const nurse = await Nurse.findById(req.params.id);
        if (nurse) {
            await nurse.remove();
            res.json({ message: 'Nurse deleted' });
        } else {
            res.status(404).json({ message: 'Nurse not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = {
    getAllNurses,
    getNurseById,
    createNurse,
    updateNurse,
    deleteNurse,
    loginNurse,
 

};
