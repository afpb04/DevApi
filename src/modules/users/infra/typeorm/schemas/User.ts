import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm';

@Entity('users')
class User {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;
}
export default User;
