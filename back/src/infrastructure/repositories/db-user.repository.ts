import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { Result } from '../../util/result';
import { UserDAO } from '../dao/user.dao';

export class DBUserRepository {
  constructor(
    @InjectRepository(UserDAO)
    private readonly userRepository: Repository<UserDAO>,
  ) {}

  public async findByEmail(email: string): Promise<Result<UserEntity>> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return Result.failure(new Error('User not found'));
    }

    const userEntity = new UserEntity(user.id, user.email, user.hashedPassword);
    return Result.success(userEntity);
  }

  public async findById(id: string): Promise<Result<UserEntity>> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      return Result.failure(new Error('User not found'));
    }

    const userEntity = new UserEntity(user.id, user.email, user.hashedPassword);
    return Result.success(userEntity);
  }

  public async save(user: UserEntity): Promise<Result<void>> {
    const userDAO = this.userRepository.create({
      id: user.id,
      email: user.email,
      hashedPassword: user.getHashedPassword(),
    });

    await this.userRepository.save(userDAO);
    return Result.success(undefined);
  }
}
