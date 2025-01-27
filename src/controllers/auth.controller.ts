import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ where: { email: normalizedEmail } });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    if (!user.password) {
      res.status(500).json({ error: 'Password not set in the database' });
      return;
    }

    const passwordFromDB = user.dataValues.password;

    const isPasswordValid = await bcrypt.compare(password, passwordFromDB);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { uid: user.uid, email: user.email },
      process.env.JWT_SECRET || 'defaultSecret',
      { expiresIn: '24h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      where: { email: normalizedEmail },
    });
    if (existingUser) {
      res.status(400).json({ error: 'Email already in use' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Test Hashed Password:', hashedPassword);

    const newUser = await User.create({
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { uid: newUser.uid, email: newUser.email },
      process.env.JWT_SECRET || 'defaultSecret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      newUser: {
        uid: newUser.uid,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

export const authController = {
  login,
  register,
};
