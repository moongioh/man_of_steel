// src/domain/entities/UserEntity.ts

export class UserEntity {
  public id: string;
  public email: string;
  public password: string; // 원시 비밀번호
  public hashedPassword: string; // 해시된 비밀번호

  constructor(id: string, email: string, password?: string, hashedPassword?: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.hashedPassword = hashedPassword;
  }
}
