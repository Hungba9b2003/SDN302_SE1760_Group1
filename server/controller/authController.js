const Account = require('../models/Account');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const account = await Account.findOne({ username });
        if (!account) {
            return res.status(400).json({ message: 'Thông tin xác thực không đúng' });
        }

        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Thông tin xác thực không đúng' });
        }

        const token = jwt.sign(
            { id: account.id, role: account.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        account.token = token;
        await account.save();

        res.json({ token });
    } catch (error) {
        console.error(error); // Log lỗi để dễ dàng theo dõi
        res.status(500).json({ message: 'Server error' });
    }
}

exports.register = async (req, res) => {
  
    const { username, password } = req.body;

    console.log('register', username, password);

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    try {
      let account = await Account.findOne({ username });
      if (account) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      account = new Account({
        username: username,
        password: hashedPassword,
      });
  
      await account.save();
      res.status(201).json({ message: 'Account registered successfully' });
    } catch (error) {
      res.status(500).json({  message: error.message ||'Server error' });     
        console.error(error);
    }
  };