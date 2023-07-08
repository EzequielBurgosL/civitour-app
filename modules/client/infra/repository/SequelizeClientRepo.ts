import { PhoneNumber } from '../../../../core/domain/ValueObjects/PhoneNumber';
import { Client } from '../../domain/Client';
import { ClientRepo } from '../../domain/ClientRepo';
import { ClientMap } from '../mappers/clientMap';

type BaseQuery = {
  where: {
    [key: string]: string;
  };
  includes?: any;
};

// Type SqlConnection = {
//   Client: {
//     findOne: Function,
//     create: Function,
//     update: Function,
//   }
// }

export class SequelizeClientRepo implements ClientRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery(): BaseQuery {
    return {
      where: {},
    };
  }

  public async findClientByPhone(phone: PhoneNumber): Promise<Client> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where.phone = phone.value;

    const client = await this.models.Client.findOne(baseQuery);

    if (!client) {
      return null;
    }

    return client;
  }

  public async exists(phone: PhoneNumber): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where.phone = phone.value;
    const client = await this.models.Client.findOne(baseQuery);

    return Boolean(client) === true;
  }

  public async save(client: Client): Promise<void> {
    const ClientMode = this.models.Client;
    const exists = await this.exists(client.phoneNumber);
    const map = new ClientMap();
    const rawUser = map.toPersistence(client);

    try {
      if (exists) {
        const sequelizeUserInstance = await ClientMode.findOne({
          where: { phone: client.phoneNumber.value },
        });

        await sequelizeUserInstance.update(rawUser);
      } else {
        await ClientMode.create(rawUser);
      }
    } catch (err) {
      throw new Error();
    }
  }
}
