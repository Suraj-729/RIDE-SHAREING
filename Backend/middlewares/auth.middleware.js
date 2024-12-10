// const userModel = require('../models/user.model');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');



// module.exports.authUser = async (req, res, next) => {
//     const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
//     if(!token) {
//         return res.status(401).json({ message: 'Unauthorized '});
//     }

//     try{

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decoded._id);

//         req.user = user;
        
        

//         return next();
        
//     } catch (err) {
//         return res.status(401).json({ message: 'Unauthorized Access'});

//     }

// }

const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.authUser = async (req, res, next) => {


    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token missing' });
        }



       const isBlacklisted = await userModel.findOne({ token: token });
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
