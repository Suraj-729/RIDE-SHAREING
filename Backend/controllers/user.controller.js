const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res , next) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
     }
    

     console.log(req.body);
     

     const { fullname,  email, password } = req.body;

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

   res.status(200).json({ token, user });
}


// module.exports.getUserProfile = async (req, res, next) => {

//    res.status(200).json(req.user);

// }
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