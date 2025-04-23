
import { auth } from './config'; // Initialize Firebase Admin SDK
import User from '../models/User'; // MongoDB user model
import { Request, Response } from 'express';

// This will save the user to MongoDB after Firebase signup
export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  try {
    // Create user with Firebase Admin SDK (on the backend)
    const userRecord = await auth.createUser({
      email,
      password,
    });
    console.log(userRecord)

    // Save user to MongoDB (with Firebase UID)
    const newUser = new User({
      email: userRecord.email,
      uid: userRecord.uid,
    });

    await newUser.save();  // Save the user in MongoDB

    res.status(200).send({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error creating user: ', err);
    res.status(500).send({ message: 'Error creating user' });
  }
};
