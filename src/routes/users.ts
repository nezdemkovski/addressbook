import bcrypt from 'bcryptjs';
import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator/check';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config';
import User from '../db/models/User';

const router: Router = Router();

// Register new user
router.post(
  '/register',
  [
    check('email')
      .isEmail()
      .withMessage('Invalid email format')
      .custom(value =>
        User.findOne({ email: value }).then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        }),
      ),
    check('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 chars long'),
    check('username')
      .isLength({ min: 1 })
      .withMessage('Username cannot be empty value'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const data = await User.create({ ...req.body, password });

    res.send({
      data,
      token: jwt.sign({ userId: data.id }, JWT_SECRET),
    });
  },
);

// Sign in user
router.post(
  '/signin',
  [
    check('email')
      .isEmail()
      .withMessage('Invalid email format'),
    check('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 chars long'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const data = await User.findOne({ email: req.body.email });

    if (!data) {
      return res.status(401).json({ errors: 'Unauthorized' });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      data.password,
    );

    if (!isValidPassword) {
      return res.status(401).json({ errors: 'Unauthorized' });
    }

    res.send({
      data,
      token: jwt.sign({ userId: data.id }, JWT_SECRET),
    });
  },
);

export default router;
