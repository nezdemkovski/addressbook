import { verify } from 'jsonwebtoken';

import { JWT_SECRET } from './config';

interface Token {
  userId: string;
}

export function getUserId(token: string | null) {
  if (token) {
    const apiToken = token.replace('Bearer ', '');
    const verifiedToken = verify(apiToken, JWT_SECRET) as Token;

    return verifiedToken && verifiedToken.userId;
  }
}

// const sanitizeData = () => {};
