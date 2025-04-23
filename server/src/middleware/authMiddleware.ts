// server/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { auth } from 'firebase-admin';

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split('Bearer ')[1]; // Extract token from header
  
  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  try {
    const decoded = await auth().verifyIdToken(token);  // Firebase Admin verifies the token
    req.user = decoded;  // Attach decoded user data (UID, email, etc.) to request
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).send({ message: 'Invalid or expired token' });
  }
};
