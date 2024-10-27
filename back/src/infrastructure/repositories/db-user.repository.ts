import { UserEntity } from '../../domain/entities/user.entity';
import { Result } from '../../util/result';
import { MySQLService } from '../services/mysql.service';
import { UserDAO } from '../dao/user.dao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DBUserRepository {
  private mysqlService: MySQLService;

  constructor(mysqlService: MySQLService) {
    this.mysqlService = mysqlService;
  }

  public async findByEmail(email: string): Promise<Result<UserEntity>> {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const rows = await this.mysqlService.query(sql, [email]);

    if (rows.length === 0) {
      return Result.failure(new Error('User not found'));
    }

    const userDAO = new UserDAO(
      rows[0].id,
      rows[0].email,
      rows[0].hashedPassword,
    );
    const userEntity = new UserEntity(
      userDAO.id,
      userDAO.email,
      userDAO.hashedPassword,
    );

    return Result.success(userEntity);
  }

  public async findById(id: string): Promise<Result<UserEntity>> {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const rows = await this.mysqlService.query(sql, [id]);

    if (rows.length === 0) {
      return Result.failure(new Error('User not found'));
    }

    const userDAO = new UserDAO(
      rows[0].id,
      rows[0].email,
      rows[0].hashedPassword,
    );
    const userEntity = new UserEntity(
      userDAO.id,
      userDAO.email,
      userDAO.hashedPassword,
    );

    return Result.success(userEntity);
  }

  public async save(user: UserEntity): Promise<Result<void>> {
    const sql =
      'INSERT INTO users (id, email, hashedPassword) VALUES (?, ?, ?)';
    await this.mysqlService.query(sql, [
      user.id,
      user.email,
      user.getHashedPassword(),
    ]);
    return Result.success(undefined);
  }
}
