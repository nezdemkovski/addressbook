import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator/check';

import User from '../models/User';

const router: Router = Router();

// Get list of users
router.get('/', async (_: Request, res: Response) => {
  const data = await User.find();

  res.send({
    data,
  });
});

// Create user
router.post(
  '/create',
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

    const data = await User.create(req.body);

    res.send({
      data,
    });
  },
);

export default router;
