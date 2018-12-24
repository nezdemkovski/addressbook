import { NextFunction, Request, Response, Router } from 'express';

import User from '../db/models/User';

const router: Router = Router();

// @ts-ignore
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const asd = await User.create({
    email: 'hi@mynameisyuri.com',
    password: 'testpass',
    name: 'Yuri',
  });

  console.log(asd);

  res.send({
    data: asd,
  });
});

export default router;
