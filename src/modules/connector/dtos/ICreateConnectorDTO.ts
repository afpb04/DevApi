import { ObjectID } from 'typeorm';

export default interface ICreateConnectorDTO {
  id?: ObjectID;
  name: string;
  type: string;
  privacy: string;
  base_url: string;
  logo_url: string;
  category: string;
  description: string;
  status: string;
  user_id: string;
}
