import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserDAO {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public hashedPassword: string;

  constructor(id: string, email: string, hashedPassword: string) {
    this.id = id;
    this.email = email;
    this.hashedPassword = hashedPassword;
  }
}
