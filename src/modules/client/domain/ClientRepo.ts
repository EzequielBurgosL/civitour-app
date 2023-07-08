import { PhoneNumber } from '../../../core/domain/ValueObjects/PhoneNumber';
import { Client } from './Client';

export interface ClientRepo {
  exists(phone: PhoneNumber): Promise<boolean>;
  findClientByPhone(phone: PhoneNumber): Promise<Client>;
  save(user: Client): Promise<void>;
}
