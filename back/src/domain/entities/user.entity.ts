import { BcryptService } from '../../infrastructure/services/bcrypt.service';
import { UserDTO } from '../../presentation/dto/user.dto';
import { UserDAO } from '../../infrastructure/dao/user.dao';

export class UserEntity {
  public id: string;
  public email: string;
  private hashedPassword: string;

  constructor(id: string, email: string, hashedPassword: string) {
    this.id = id;
    this.email = email;
    this.hashedPassword = hashedPassword;
  }

  public async checkPassword(
    rawPassword: string,
    bcryptService: BcryptService,
  ): Promise<boolean> {
    return bcryptService.compare(rawPassword, this.hashedPassword);
  }

  public async setPassword(
    password: string,
    bcryptService: BcryptService,
  ): Promise<void> {
    this.hashedPassword = await bcryptService.hash(password);
  }

  public getHashedPassword(): string {
    return this.hashedPassword;
  }

  public toDTO(): UserDTO {
    return new UserDTO(this.id, this.email);
  }

  public toDAO(): UserDAO {
    return new UserDAO(this.id, this.email, this.hashedPassword);
  }
}
