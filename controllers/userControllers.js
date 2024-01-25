const {User} = require('../models/user.model')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
      const { phone_number, priority } = req.body;
  
      if (!phone_number || !priority) {
        return res.status(400).json({ error: 'Phone number and priority are required' });
      }
  
      if (![0, 1, 2].includes(priority)) {
        return res.status(400).json({ error: 'Invalid priority value' });
      }

      const existingUser = await User.findOne({ phone_number });

      if (existingUser) {
          return res.status(400).json({ error: 'Phone number is already in use' });
      }
  
      const newUser = new User({
        phone_number,
        priority,
      });
  
      await newUser.save();
      
      const token = jwt.sign({ user_id: newUser._id }, process.env.ACCESS_TOKEN_SECRET  , {expiresIn : process.env.ACCESS_TOKEN_EXPIRY});
      const userData = { user: newUser, token };

      console.log("New User Created" , userData);
      
      res.status(201).json({ user: newUser, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  module.exports = {createUser}