

const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blackListTokenModel = require('../models/blacklistToken.model')
const captainModel = require('../models/captain.model')

module.exports.authUser = async (req, res, next) => {


    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token missing' });
        }



       const isBlacklisted = await blackListTokenModel.findOne({ token: token });
        if(isBlacklisted){
            return res.status(401).json({ message: 'Unauthorized: Access' });
        }


    try {
        // Extract token from cookies or Authorization header
        
         
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);

        // Find user in the database
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user to request
        req.user = user;
       // console.log('Authenticated User:', user);

        next(); // Proceed to next middleware or route handler
    } catch (err) {
        //console.error('JWT Verification Error:', err.message);
        res.status(401).json({ message: 'Unauthorized Access' });
    }
};

module.exports.authCaptain = async (req, res, next) => {


    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token missing' });
        }



       const isBlacklisted = await blackListTokenModel.findOne({ token: token });
        if(isBlacklisted){
            return res.status(401).json({ message: 'Unauthorized: Access' });
        }


    try {
        // Extract token from cookies or Authorization header
        
         
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log('Decoded Token:', decoded);

        // Find user in the database
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }

        // Attach user to request
        req.captain = captain;
       // console.log('Authenticated User:', user);

        return next(); // Proceed to next middleware or route handler
    } catch (err) {
        //console.error('JWT Verification Error:', err.message);
        res.status(401).json({ message: 'Unauthorized Access' });
    }


}