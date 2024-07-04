import { compare, genSalt, hash } from 'bcryptjs';

export const generateHash = async (password: string): Promise<string> =>
  genSalt(10).then((salt: string) => hash(password, salt));

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => compare(password, hash);
