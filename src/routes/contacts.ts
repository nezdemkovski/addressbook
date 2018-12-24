import { Request, Response, Router } from 'express';

import { addContact, getContactList } from '../db/firebase';
import { getUserId } from '../utils';

const router: Router = Router();

// Get list of contacts
router.get('/', async (req: Request, res: Response) => {
  const userId = getUserId(req.headers.authorization);

  if (!userId) {
    return res.status(401).json({ errors: 'Unauthorized' });
  }

  res.send({
    data: await getContactList(userId),
  });
});

// Create new contact
router.post('/create', async (req: Request, res: Response) => {
  const userId = getUserId(req.headers.authorization);

  if (!userId) {
    return res.status(401).json({ errors: 'Unauthorized' });
  }

  res.send({
    data: await addContact({ ...req.body, userId }),
  });
});

export default router;
