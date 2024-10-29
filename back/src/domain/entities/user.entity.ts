export class UserEntity {
  public id: string; // UUID for internal use
  public email: string; // Used as the unique identifier for login
  public password?: string; // Raw password
  public hashedPassword?: string; // Hashed password

  constructor(email: string, password?: string, hashedPassword?: string) {
    this.email = email;
    this.password = password;
    this.hashedPassword = hashedPassword;
  }
}
