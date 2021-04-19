import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

@Entity('connectors')
class Connector {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  privacy: string;

  @Column()
  base_url: string;

  @Column()
  logo_url: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  user_id: string;
}

export default Connector;
