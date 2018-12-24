import { Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/', async (_: Request, res: Response) => {
  res.send({
    data: 'Hello from Yuri!',
  });
});

export default router;
