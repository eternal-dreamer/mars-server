import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: 'User doesn\'t exist.' });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Credentials.' });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, phone, password, confirmPassword } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists.' });

    if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords don\'t match.' });
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ firstName: firstName, lastName: lastName, email: email, password: hashedPassword, fullName: `${firstName} ${lastName}`, phone: phone })
    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};