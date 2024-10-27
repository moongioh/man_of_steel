import { Injectable } from '@nestjs/common';
import { Result } from '../../util/Result';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserDAO } from '../dao/user.dao';

@Injectable()
export class DBUserRepository {
  constructor(
    @InjectRepository(UserDAO)
    private readonly userRepository: Repository<UserDAO>,
  ) {}

  public async findByEmail(email: string): Promise<Result<UserEntity>> {
    const userDAO = await this.userRepository.findOne({ where: { email } });

    if (!userDAO) {
      return Result.failure(new Error('User not found'));
    }

    const userEntity = new UserEntity(
      userDAO.id,
      userDAO.email,
      undefined,
      userDAO.hashedPassword,
    );
    return Result.success(userEntity);
  }

  public async findById(id: string): Promise<Result<UserEntity>> {
    const userDAO = await this.userRepository.findOne({ where: { id } });

    if (!userDAO) {
      return Result.failure(new Error('User not found'));
    }

    const userEntity = new UserEntity(
      userDAO.id,
      userDAO.email,
      undefined,
      userDAO.hashedPassword,
    );
    return Result.success(userEntity);
  }

  public async save(user: UserEntity): Promise<Result<void>> {
    const userDAO = new UserDAO();
    userDAO.id = user.id;
    userDAO.email = user.email;
    userDAO.hashedPassword = user.hashedPassword;

    await this.userRepository.save(userDAO);
    return Result.success(undefined);
  }
}
