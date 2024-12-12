const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res , next) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
     }
    

     console.log(req.body);
     

     const { fullname,  email, password } = req.body;
     const isUserAlready = await userModel.findOne({ email });
      if(isUserAlready){
         
            return res.status(400).json({ message: 'User already exist' });
        
      }
     const hashedPassword = await userModel.hashPassword(password);


     const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
     });

     const token = user.generateAuthToken();
     res.status(201).json({ token, user });
     
}


module.exports.loginUser = async (req, res , next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() });
   }

   const { email, password } = req.body;
   const user = await userModel.findOne({ email }).select('+password');
   //+password it means in the userModel the there is status called false that's why '+' symbol is required;

   if(!user) {
      return res.status(401).json({ message: 'Invalid email or password'});

   }

   const isMatch = await user.comparePassword(password);

   if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password'});

   }

   const token = user.generateAuthToken();

    res.cookie('token', token 
   //    httpOnly: true,
   //    secure: process.env.NODE_ENV === 'production',
   //    maxAge: 3600000
    );

   res.status(200).json({ token, user });
}



module.exports.getUserProfile = async (req, res, next) => {
   try {
       if (!req.user) {
           return res.status(404).json({ message: 'User profile not found' });
       }

       res.status(200).json(req.user);
   } catch (err) {
       console.error('Get User Profile Error:', err.message);
       res.status(500).json({ message: 'Internal Server Error' });
   }
};


module.exports.logoutUser = async (req, res , next) => {
   res.clearCookie('token');
   const token = req.cookies.token || req.headers.authorization.split(' ')[1];
   await blackListTokenModel.create({ token });
   res.status(200).json({ message: 'Logged Out'});
}