import * as bcrypt from 'bcrypt';
import { ENV } from '../../env.config';

export class BcryptService {
  private readonly saltRounds: number;

  constructor() {
    this.saltRounds = ENV.BCRYPT_SALT_ROUNDS;
  }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
